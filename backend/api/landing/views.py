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
        print(request.POST)
        item = self.get_object()
        serializer = ItemSerializer(item, data=request.data, partial=True)

        if serializer.is_valid():
            if request.FILES.get("image"):
                image = request.FILES.get("image")
                item.image.storage.delete(item.image.path)
                item.image = image

            item.buttonText = request.data["text"]
            item.buttonLink = request.data["link"]
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


class PricingPlanListCreateView(generics.ListCreateAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer


# class PricingPlanRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = PricingPlan.objects.all()
#     serializer_class = PricingPlanSerializer

#     def update(self, request, *args, **kwargs):
#         plan = self.get_object()
#         serializer = PricingPlanSerializer(plan, data=request.data, partial=True)

#         if serializer.is_valid():
#             if request.FILES.get("image"):
#                 image = request.FILES.get("image")
#                 plan.image.storage.delete(plan.image.path)
#                 plan.image = image

#             plan = serializer.save()

#             features = request.data.get("features").split(",")
#             features = [{"detail": feature.strip()} for feature in features]
#             feature_ids = []
#             for feature_data in features:
#                 feature, created = Feature.objects.get_or_create(
#                     detail=feature_data.get("detail")
#                 )
#                 feature_ids.append(feature.id)
#                 if not created:
#                     feature.detail = feature_data.get("detail")
#                     feature.save()

#             supportedsites = request.data.get("supportedsites").split(",")
#             supportedsites = [{"site": site.strip()} for site in supportedsites]
#             supportedsite_ids = []
#             for supportedsite_data in supportedsites:
#                 supportedsite, created = SupportedSites.objects.get_or_create(
#                     site=supportedsite_data.get("site")
#                 )
#                 supportedsite_ids.append(supportedsite.id)
#                 if not created:
#                     supportedsite.site = supportedsite_data.get("site")
#                     supportedsite.save()

#             plan.features.set(feature_ids)
#             plan.supportedsites.set(supportedsite_ids)
#             plan.bestFor = request.data["best_for"]
#             plan.save()

#             serializer = PricingPlanSerializer(plan)

#             return Response(serializer.data, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PricingPlanRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    def update(self, request, *args, **kwargs):
        pricing_plan = self.get_object()
        serializer = self.get_serializer(pricing_plan, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            if request.FILES.get("image"):
                pricing_plan.image.delete()
                pricing_plan.image = request.FILES.get("image")

            pricing_plan = serializer.save()

            feature_ids = self._get_or_create_features(request.data.get("features"))
            pricing_plan.features.set(feature_ids)
            supported_site_ids = self._get_or_create_supported_sites(
                request.data.get("supported_sites")
            )

            pricing_plan.supported_sites.set(supported_site_ids)

            pricing_plan.best_for = request.data.get("best_for")
            pricing_plan.save()

        return Response(self.get_serializer(pricing_plan).data)

    def _get_or_create_features(self, feature_list):
        feature_ids = []

        if feature_list:
            for feature_name in feature_list.split(","):
                feature_name = feature_name.strip()

                if not feature_name:
                    continue

                feature, created = Feature.objects.get_or_create(detail=feature_name)
                feature_ids.append(feature.id)

                if not created:
                    feature.detail = feature_name
                    feature.save()

        return feature_ids

    def _get_or_create_supported_sites(self, site_list):
        site_ids = []

        if site_list:
            for site_name in site_list.split(","):
                site_name = site_name.strip()

                if not site_name:
                    continue

                site, created = SupportedSites.objects.get_or_create(site=site_name)
                site_ids.append(site.id)

                if not created:
                    site.site = site_name
                    site.save()

        return site_ids


class ProcessViewSet(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer


class TestimonialViewSet(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
