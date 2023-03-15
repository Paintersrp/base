from rest_framework import status, generics, mixins, viewsets
from django.db.models import Q
from rest_framework.response import Response
from .models import (
    HeroBlock,
    ServiceTier,
    Feature,
    SupportedSites,
    Item,
    TitleBlock,
    Testimonial,
    Process,
)
from .serializers import *
from authorization.authentication import JWTTokenAuthentication
from about.models import ContactInformation
from articles.models import Articles
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes


class LandingFull(object):
    def __init__(
        self,
        hero_block,
        title_block_process,
        title_block_news,
        service_tiers,
        processes,
        contact_information,
        articles,
    ):

        self.hero_block = hero_block
        self.title_block_process = title_block_process
        self.title_block_news = title_block_news
        self.service_tiers = service_tiers
        self.processes = processes
        self.contact_information = contact_information
        self.articles = articles


class LandingFullView(generics.GenericAPIView):
    serializer_class = LandingFullSerializer

    def get(self, request, *args, **kwargs):
        hero_block = HeroBlock.objects.first()
        title_block_process = TitleBlock.objects.get(name="process")
        title_block_news = TitleBlock.objects.get(name="news")
        service_tiers = ServiceTier.objects.all()
        processes = Process.objects.all()
        contact_information = ContactInformation.objects.first()
        articles = Articles.objects.filter(is_highlighted=True)

        landing_full = LandingFull(
            hero_block,
            title_block_process,
            title_block_news,
            service_tiers,
            processes,
            contact_information,
            articles,
        )

        serializer = self.get_serializer(instance=landing_full)

        return Response(serializer.data)


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


class HeroBlockAPIView(generics.ListCreateAPIView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class HeroBlockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = HeroBlock.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TitleBlockAPIView(generics.ListCreateAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class TitleBlockUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = TitleBlock.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TitleBlockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    lookup_field = "name"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = TitleBlock.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

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
            create_log_entry(LogEntry.Action.UPDATE, request.username, item, changes)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class FeatureViewSet(generics.ListCreateAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class FeatureDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Feature.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class SupportedSiteViewSet(generics.ListCreateAPIView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class SupportedSiteDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = SupportedSites.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


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
        create_log_entry(LogEntry.Action.CREATE, request.username, pricing_plan, None)

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
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ProcessViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class ProcessDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Process.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TestimonialViewSet(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)
