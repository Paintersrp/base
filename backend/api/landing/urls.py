from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroBlockAPIView,
    PricingPlanViewSet,
    FeatureViewSet,
    SupportedSiteViewSet,
)


router = DefaultRouter()
router.register(r"pricing_plans", PricingPlanViewSet)
router.register(r"features", FeatureViewSet)
router.register(r"supported_sites", SupportedSiteViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("heroblock/", HeroBlockAPIView.as_view(), name="hero-block"),
]
