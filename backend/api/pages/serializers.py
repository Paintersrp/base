from rest_framework import serializers
from .models import *
from authorization.serializers import UserSerializer
from jobs.models import JobPosting
from jobs.serializers import JobPostingSerializer
from general.serializers import HeaderSerializer
from contact.serializers import ContactSerializer
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from functools import reduce
from django.db.models import Q
import re


class DataSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"


class ComponentCategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ComponentCategory
        fields = "__all__"


class ComponentObjMinSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ComponentObj
        fields = "__all__"


class ComponentObjSerializer(serializers.ModelSerializer):
    data_source = serializers.SerializerMethodField()
    content_type_info = serializers.SerializerMethodField()
    used_on = serializers.SerializerMethodField(label="Used On")
    author_details = UserSerializer(source="author", read_only=True)
    category_details = ComponentCategorySerializer(source="category", read_only=True)
    FIELD_KEYS = [
        "name",
        "order",
        "content",
        "used_on",
        "category",
    ]

    class Meta:
        model = ComponentObj
        fields = [
            "id",
            "name",
            "order",
            "category",
            "category_details",
            "description",
            "active",
            "content",
            "query_params",
            "author",
            "author_details",
            "data_source",
            "content_type_info",
            "used_on",
            "created_at",
            "updated_at",
        ]

    def get_used_on(self, component):
        used_on = component.pageobj_set.values_list("page_name", flat=True) or ["None"]

        return [i.strip() for i in ",".join(used_on).split(",")]

    def get_data_source(self, obj):
        print(obj)
        try:
            model = obj.content.model_class()
        except:
            try:
                model = obj["content"].model_class()
            except ObjectDoesNotExist:
                return None

        qs = model.objects.all()

        try:
            query_params = obj.query_params
        except:
            try:
                query_params = obj["query_params"]
            except ObjectDoesNotExist:
                return None

        if len(query_params) == 1:
            key, value = next(iter(query_params.items()))
            qs = qs.filter(**value)
        elif len(query_params) > 1:
            q_objects = []
            for key, value in obj.query_params.items():
                for k, v in value.items():
                    q_objects.append(Q(**{f"{k}" if key == "0" else f"{k}": v}))

            qs = qs.filter(
                reduce(lambda x, y: x | y, q_objects)
            )  # combine the Q objects with OR operator

        serializer_class = model.serializer_class
        serializer = serializer_class(
            qs,
            many=True,
            context={"request": self.context["request"]},
        )

        return serializer.data

    def get_content_type_info(self, obj):
        try:
            model = obj.content.model_class()
        except ObjectDoesNotExist:
            return None

        filter_options = model._meta.filter_options

        filter_choices = {}
        for option in filter_options:
            field = model._meta.get_field(option)
            if isinstance(field, models.ForeignKey) or isinstance(
                field, models.ManyToManyField
            ):
                related_model = field.related_model
                choices_qs = related_model.objects.all()
                choices = [{"value": c.pk, "display_name": str(c)} for c in choices_qs]
            else:
                choices_qs = (
                    model.objects.order_by().values_list(option, flat=True).distinct()
                )
                choices = [{"value": c, "display_name": str(c)} for c in choices_qs]

            filter_choices[option] = choices

        return {
            "filter_options": filter_options,
            "model": model._meta.verbose_name,
            "filter_choices": filter_choices,
        }

    def get_serializer_class(self, model):
        attrs = {field.name: serializers.CharField() for field in model._meta.fields}
        attrs["Meta"] = type("Meta", (object,), {"model": model, "fields": "__all__"})
        return type("DynamicSerializer", (serializers.ModelSerializer,), attrs)


class PageObjSerializer(serializers.ModelSerializer):
    components = ComponentObjSerializer(many=True)
    author_details = UserSerializer(source="author", read_only=True)
    seo_data_details = HeaderSerializer(source="seo_data", read_only=True)
    FIELD_KEYS = [
        "page_name",
        "slug",
        "components",
        "access",
    ]

    class Meta:
        model = PageObj
        fields = (
            "id",
            "page_name",
            "components",
            "slug",
            "author",
            "author_details",
            "seo_data",
            "seo_data_details",
            "access",
            "description",
            "featured",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        components_data = validated_data.pop("components")
        page = PageObj.objects.create(**validated_data)

        for component_data in components_data:
            component, _ = ComponentObj.objects.get_or_create(
                content=component_data.get("content"), name=component_data.get("name")
            )
            page.components.add(component)

        return page

    def update(self, instance, validated_data):
        formatted_data = self.format_data(self.context["request"].data)
        print(formatted_data)

        components_data = formatted_data.pop("components")
        instance.slug = formatted_data.get("slug", instance.slug)
        instance.page_name = formatted_data.get("page_name", instance.page_name)
        instance.access = formatted_data.get("access", instance.access)

        instance.components.clear()

        for component_data in components_data:
            component, _ = ComponentObj.objects.get_or_create(
                content=component_data.get("content"), name=component_data.get("name")
            )
            component.save()
            instance.components.add(component)

        if "seo_data" in formatted_data:
            print("yes")
            seo_data, _ = Header.objects.get_or_create(
                id=formatted_data.get("seo_data")
            )
            print(seo_data)

        instance.seo_data = seo_data
        instance.save()

        return instance

    def format_data(self, data, create=False):
        formatted_data = {}
        components = []

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "components":
                if (
                    len(parts) == 2
                    and parts[0].isdigit()
                    and (
                        parts[1] == "name" or parts[1] == "content" or parts[1] == "id"
                    )
                ):
                    if parts[1] == "id":
                        print("id")

                    idx = int(parts[0])
                    feature_detail = {parts[1]: value}

                    if idx >= len(components):
                        components.append({})
                    components[idx].update(feature_detail)
            else:
                formatted_data[name] = value

        if components:
            formatted_data["components"] = components

        return formatted_data


class PageObjNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageObj
        fields = (
            "id",
            "page_name",
            "verbose_name",
            "access",
        )


class PageSetSerializer(serializers.ModelSerializer):
    pages = PageObjSerializer(many=True)
    FIELD_KEYS = ["set_name"]

    class Meta:
        model = PageSet
        fields = "__all__"

    def format_data(self, request):
        page_data = request.POST.getlist("pages")
        print(page_data)
        pages = []
        for data in page_data:
            page_id = data.get("id")
            page_name = data.get("page_name")
            page_obj = (
                PageObj.objects.get(id=page_id)
                if page_id
                else PageObj.objects.get(page_name=page_name)
            )

            pages.append(page_obj)


class AppSerializer(serializers.ModelSerializer):
    page_set_data = PageSetSerializer(source="page_set", read_only=True)
    contact_set_data = ContactSerializer(source="contact_set", read_only=True)
    jobs_data = serializers.SerializerMethodField()
    FIELD_KEYS = ["app_name"]

    class Meta:
        model = App
        fields = [
            "id",
            "app_name",
            "business_name",
            "page_set",
            "contact_set",
            "nav_component",
            "footer_component",
            "fab_component",
            "error_component",
            "loading_component",
            "snackbar_component",
            "not_found_component",
            "jobs",
            "users",
            "services",
            "page_set_data",
            "contact_set_data",
            "jobs_data",
        ]

    def get_jobs_data(self, obj):
        if obj.jobs:
            jobs = JobPosting.objects.filter(filled=False)
            serializer = JobPostingSerializer(jobs, many=True)
            return serializer.data
        return []


ComponentCategory.serializer_class = ComponentCategorySerializer
ComponentObj.serializer_class = ComponentObjSerializer
PageSet.serializer_class = PageSetSerializer
PageObj.serializer_class = PageObjSerializer
App.serializer_class = AppSerializer
