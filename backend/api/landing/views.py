from rest_framework import status, generics, mixins, viewsets
from django.db.models import Q
from rest_framework.response import Response
from .models import (
    HeroBlock,
    PricingPlan,
    Feature,
    SupportedSites,
    Item,
    TitleBlock,
    Testimonial,
    Process,
)
from .serializers import (
    HeroBlockSerializer,
    PricingPlanSerializer,
    FeatureSerializer,
    SupportedSitesSerializer,
    ItemSerializer,
    TitleBlockSerializer,
    TestimonialSerializer,
    ProcessSerializer,
)
from authorization.authentication import JWTTokenAuthentication
from django.db import transaction
import re


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


class HeroBlockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroBlockSerializer


class TitleBlockAPIView(generics.ListCreateAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer


class TitleBlockUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer


class TitleBlockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TitleBlock.objects.all()
    serializer_class = TitleBlockSerializer
    lookup_field = "name"


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        item = self.get_object()

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
            # item = serializer.save()
            item.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeatureViewSet(generics.ListCreateAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer


class SupportedSiteViewSet(generics.ListCreateAPIView):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer


class PricingPlanView(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView
):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    def create(self, request, *args, **kwargs):
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("title")
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

        pricing_plan = PricingPlan.objects.create(
            title=title,
            price=price,
            image=formatted_data.get("image"),
            bestFor=formatted_data.get("bestFor"),
            guarantee=formatted_data.get("guarantee"),
        )
        pricing_plan.features.set(feature_objs)
        pricing_plan.supported_sites.set(supported_sites_objs)

        serializer = self.get_serializer(pricing_plan)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PricingPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        formatted_data = self.serializer_class().format_data(request.data)

        title = formatted_data.get("title", instance.title)
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

        instance.title = title
        instance.price = price
        instance.image = image
        instance.bestFor = formatted_data.get("bestFor", instance.bestFor)
        instance.guarantee = formatted_data.get("guarantee", instance.guarantee)
        instance.save()
        instance.features.set(feature_objs)
        instance.supported_sites.set(supported_sites_objs)
        serializer = self.get_serializer(instance)

        return Response(serializer.data)


class ProcessViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer


class ProcessDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer


class TestimonialViewSet(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
