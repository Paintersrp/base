from rest_framework import status, generics, mixins, viewsets
from rest_framework.response import Response
from .models import (
    HeroBlock,
    PricingPlan,
    Feature,
    SupportedSites,
)
from .serializers import (
    HeroBlockSerializer,
    PricingPlanSerializer,
    FeatureSerializer,
    SupportedSitesSerializer,
)
from authorization.authentication import JWTTokenAuthentication


class HeroBlockAPIView(
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


class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer


class SupportedSiteViewSet(viewsets.ModelViewSet):
    queryset = SupportedSites.objects.all()
    serializer_class = SupportedSitesSerializer


class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer

    def update(self, request, *args, **kwargs):
        plan = self.get_object()
        serializer = PricingPlanSerializer(plan, data=request.data, partial=True)

        if serializer.is_valid():
            if request.FILES.get("image"):
                image = request.FILES.get("image")
                plan.image.storage.delete(plan.image.path)
                plan.image = image

            plan = serializer.save()

            features = request.data.get("features").split(",")
            features = [{"detail": feature.strip()} for feature in features]
            feature_ids = []
            for feature_data in features:
                feature, created = Feature.objects.get_or_create(
                    detail=feature_data.get("detail")
                )
                feature_ids.append(feature.id)
                if not created:
                    feature.detail = feature_data.get("detail")
                    feature.save()

            supportedsites = request.data.get("supportedsites").split(",")
            supportedsites = [{"site": site.strip()} for site in supportedsites]
            supportedsite_ids = []
            for supportedsite_data in supportedsites:
                supportedsite, created = SupportedSites.objects.get_or_create(
                    site=supportedsite_data.get("site")
                )
                supportedsite_ids.append(supportedsite.id)
                if not created:
                    supportedsite.site = supportedsite_data.get("site")
                    supportedsite.save()

            plan.features.set(feature_ids)
            plan.supportedsites.set(supportedsite_ids)
            plan.save()

            serializer = PricingPlanSerializer(plan)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
