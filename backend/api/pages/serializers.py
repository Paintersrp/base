from rest_framework import serializers
from .models import *
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from django.apps import apps
import re


class DataSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"


class ComponentObjSerializer(serializers.ModelSerializer):
    data_source = serializers.SerializerMethodField()
    FIELD_KEYS = ["name"]

    class Meta:
        model = ComponentObj
        fields = ["id", "name", "content", "order", "query_params", "data_source"]

    def get_data_source(self, obj):
        try:
            model = obj.content.model_class()
        except ObjectDoesNotExist:
            return None

        qs = model.objects.all()
        qs = qs.filter(**obj.query_params) if obj.query_params else qs

        serializer_class = model.serializer_class
        serializer = serializer_class(
            qs,
            many=True,
            context={"request": self.context["request"]},
        )

        return serializer.data

    def get_serializer_class(self, model):
        attrs = {field.name: serializers.CharField() for field in model._meta.fields}
        attrs["Meta"] = type("Meta", (object,), {"model": model, "fields": "__all__"})
        return type("DynamicSerializer", (serializers.ModelSerializer,), attrs)


class ComponentSerializer(serializers.ModelSerializer):
    data_source = serializers.SerializerMethodField()
    FIELD_KEYS = ["component_name"]

    class Meta:
        model = Component
        fields = [
            "id",
            "component_name",
            "order",
            "query_set",
            "props",
            "data_source",
        ]

    def get_data_source(self, obj):
        model_name = obj.component_name

        for model in apps.get_models():
            if model.__name__ == model_name:
                model_class = model
                break
        else:
            data = None
            return data

        app_label = model_class._meta.app_label
        data_source_serializer = model_class.serializer_class

        if obj.query_set:
            if obj.query_set == "None":
                data_source_queryset = model_class.objects.get(name="Landing-Hero")
                print(data_source_queryset)

                data = data_source_serializer(
                    data_source_queryset,
                    context={"request": self.context["request"]},
                ).data
                return data
            else:
                data_source_queryset = model_class.objects.all()
        else:
            data_source_queryset = model_class.objects.all()

        data = data_source_serializer(
            data_source_queryset,
            many=True,
            context={"request": self.context["request"]},
        ).data
        return data


class PageSerializer(serializers.ModelSerializer):
    components = ComponentSerializer(many=True)
    FIELD_KEYS = ["verbose_name", "components"]

    class Meta:
        model = Page
        fields = ("id", "page_name", "components", "verbose_name")

    def create(self, validated_data):
        print("context", self.context["request"].data)

        components_data = validated_data.pop("components")
        page = Page.objects.create(**validated_data)
        for component_data in components_data:
            component = Component.objects.create(**component_data)
            page.components.add(component)
        return page

    def update(self, instance, validated_data):
        formatted_data = self.format_data(self.context["request"].data)
        print(formatted_data)
        components_data = formatted_data.pop("components")
        instance.page_name = formatted_data.get("page_name", instance.page_name)
        instance.verbose_name = formatted_data.get(
            "verbose_name", instance.verbose_name
        )
        instance.components.clear()

        for component_data in components_data:
            component, created = Component.objects.get_or_create(
                component_name=component_data
            )
            component.save()
            instance.components.add(component)

        return instance

    def format_data(self, data, create=False):
        if create:
            formatted_data = {
                "components": [],
            }
        else:
            formatted_data = {
                "components": [],
            }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "components":
                if (
                    len(parts) == 2
                    and parts[0].isdigit()
                    and parts[1] == "component_name"
                ):
                    feature_detail = value
                    if create:
                        formatted_data[name].append({parts[1]: value})
                    else:
                        formatted_data[name].append(feature_detail)
            else:
                formatted_data[name] = value

        print(formatted_data)

        return formatted_data


class PageObjSerializer(serializers.ModelSerializer):
    components = ComponentObjSerializer(many=True)
    FIELD_KEYS = ["verbose_name", "components"]

    class Meta:
        model = Page
        fields = ("id", "page_name", "components", "verbose_name")

    def create(self, validated_data):
        print("context", self.context["request"].data)

        components_data = validated_data.pop("components")
        page = Page.objects.create(**validated_data)
        for component_data in components_data:
            component = ComponentObj.objects.create(**component_data)
            page.components.add(component)
        return page

    def update(self, instance, validated_data):
        formatted_data = self.format_data(self.context["request"].data)
        print("for", formatted_data)

        components_data = formatted_data.pop("components")
        print(formatted_data.get("page_name", instance.page_name))
        instance.page_name = formatted_data.get("page_name", instance.page_name)
        instance.verbose_name = formatted_data.get(
            "verbose_name", instance.verbose_name
        )
        instance.components.clear()

        for component_data in components_data:
            component, created = ComponentObj.objects.get_or_create(name=component_data)
            component.save()
            instance.components.add(component)

        instance.save()

        return instance

    def format_data(self, data, create=False):
        if create:
            formatted_data = {
                "components": [],
            }
        else:
            formatted_data = {
                "components": [],
            }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "components":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "name":
                    feature_detail = value
                    if create:
                        formatted_data[name].append({parts[1]: value})
                    else:
                        formatted_data[name].append(feature_detail)
            else:
                formatted_data[name] = value

        print(formatted_data)

        return formatted_data


class PageNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("id", "page_name", "verbose_name")


class PageObjNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("id", "page_name", "verbose_name")


ComponentObj.serializer_class = ComponentObjSerializer
Component.serializer_class = ComponentSerializer
Page.serializer_class = PageSerializer
PageObj.serializer_class = PageObjSerializer
