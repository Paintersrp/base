from rest_framework import status, generics, mixins, viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from contact.models import ContactInformation, Socials
from articles.models import Articles
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes, get_serialized_page_data
from api.custom_views import *


class LandingFullTestView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "HeroBlock": {
                "app_label": "landing",
                "get_first": True,
            },
            "TitleBlock": {
                "app_label": "landing",
                "filter": {"name__in": ["process", "news"]},
            },
            "ServiceTier": {
                "app_label": "landing",
            },
            "Process": {
                "app_label": "landing",
            },
            "ContactInformation": {
                "app_label": "contact",
                "get_first": True,
            },
            "Socials": {
                "app_label": "contact",
                "get_first": True,
            },
            "Articles": {
                "app_label": "articles",
                "filter": {"is_highlighted": True},
            },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class HeroBlockMainAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer

    def get_object(self):
        return HeroBlock.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class HeroBlockAPIView(BaseListView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer
    model_class = HeroBlock


class HeroBlockDetailAPIView(BaseDetailView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer
    model_class = HeroBlock


class HeroBlockBulkAPIView(BaseBulkView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer
    model_class = HeroBlock


class TitleBlockAPIView(BaseListView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    model_class = TitleBlock


class TitleBlockUpdateAPIView(BaseDetailView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    model_class = TitleBlock


class TitleBlockDetailAPIView(BaseDetailView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    model_class = TitleBlock
    lookup_field = "name"


class TitleBlockBulkAPIView(BaseBulkView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    model_class = TitleBlock


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        item = self.get_object()
        old_instance = Item.objects.get(pk=item.pk)

        if not request.FILES.get("image"):
            data["image"] = item.image

        serializer = ItemSerializer(item, data=data, partial=True)

        if serializer.is_valid():
            if request.FILES.get("image"):
                image = request.FILES.get("image")
                item.image.storage.delete(item.image.path)
                item.image = image

            item.buttonText = request.data["buttonText"]
            item.buttonLink = request.data["buttonLink"]

            item.save()

            changes = return_changes(item, old_instance)
            create_log_entry(
                LogEntry.Action.UPDATE,
                request.username if request.username else None,
                item,
                changes,
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class FeatureAPIView(BaseListView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class FeatureDetailAPIView(BaseDetailView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class FeatureBulkAPIView(BaseBulkView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    model_class = Feature


class SupportedSitesAPIView(BaseListView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class SupportedSitesDetailAPIView(BaseDetailView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class SupportedSitesBulkAPIView(BaseBulkView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer
    model_class = SupportedSites


class ServiceTierView(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView
):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer

    def create(self, request, *args, **kwargs):
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("service_title")
        price = formatted_data.get("price")

        feature_list = formatted_data.get("features", [])
        supported_sites_list = formatted_data.get("supported_sites", [])

        feature_objs = []
        for feature in feature_list:
            feature_obj, created = Feature.objects.get_or_create(detail=feature)
            feature_objs.append(feature_obj)

        supported_sites_objs = []
        for supported_site in supported_sites_list:
            supported_site_obj, created = SupportedSites.objects.get_or_create(
                detail=supported_site
            )
            supported_sites_objs.append(supported_site_obj)

        pricing_plan = ServiceTier.objects.create(
            service_title=title,
            price=price,
            image=formatted_data.get("image"),
            paragraph_one=formatted_data.get("paragraph_one"),
            paragraph_two=formatted_data.get("paragraph_two"),
            paragraph_three=formatted_data.get("paragraph_three"),
        )
        pricing_plan.features.set(feature_objs)
        pricing_plan.supported_sites.set(supported_sites_objs)
        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            pricing_plan,
            None,
        )

        serializer = self.get_serializer(pricing_plan)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ServiceTierDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ServiceTier.objects.get(pk=instance.pk)
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("service_title", instance.service_title)
        price = formatted_data.get("price", instance.price)

        feature_list = formatted_data.get("features", [])
        supported_sites_list = formatted_data.get("supported_sites", [])

        feature_objs = []
        for feature in feature_list:
            feature_obj, created = Feature.objects.get_or_create(detail=feature)
            feature_objs.append(feature_obj)

        supported_sites_objs = []
        for supported_site in supported_sites_list:
            supported_site_obj, created = SupportedSites.objects.get_or_create(
                detail=supported_site
            )
            supported_sites_objs.append(supported_site_obj)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            instance.image.storage.delete(instance.image.path)
            instance.image = image
        else:
            image = instance.image

        instance.service_title = title
        instance.price = price
        instance.image = image
        instance.paragraph_one = formatted_data.get(
            "paragraph_one", instance.paragraph_one
        )
        instance.paragraph_two = formatted_data.get(
            "paragraph_two", instance.paragraph_two
        )
        instance.paragraph_three = formatted_data.get(
            "paragraph_three", instance.paragraph_three
        )
        instance.save()
        instance.features.set(feature_objs)
        instance.supported_sites.set(supported_sites_objs)
        serializer = self.get_serializer(instance)

        changes = return_changes(instance, old_instance)
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class ServiceTierBulkAPIView(BaseBulkView):
    queryset = ServiceTier.objects.all()
    serializer_class = ServiceTierSerializer
    model_class = ServiceTier


class ProcessAPIView(BaseListView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    model_class = Process


class ProcessDetailAPIView(BaseDetailView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    model_class = Process


class ProcessBulkAPIView(BaseBulkView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    model_class = Process


class TestimonialAPIView(BaseListView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    model_class = Testimonial


class TestimonialDetailAPIView(BaseDetailView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    model_class = Testimonial


class TestimonialBulkAPIView(BaseBulkView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    model_class = Testimonial
