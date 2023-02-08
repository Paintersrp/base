from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroBlockAPIView,
    PricingPlanViewSet,
    FeatureViewSet,
    SupportedSiteViewSet,
    TileViewSet,
    ItemViewSet,
    TitleBlockAPIView,
    TitleBlockDetailAPIView,
    TestimonialViewSet,
    ProcessViewSet,
)


router = DefaultRouter()
router.register(r"pricing_plans", PricingPlanViewSet)
router.register(r"features", FeatureViewSet)
router.register(r"supported_sites", SupportedSiteViewSet)
router.register(r"tiles", TileViewSet)
router.register(r"processes", ProcessViewSet)
router.register(r"items", ItemViewSet, basename="items")
router.register(r"testimonials", TestimonialViewSet, basename="testimonials")


urlpatterns = [
    path("", include(router.urls)),
    path("heroblock/", HeroBlockAPIView.as_view(), name="hero-block"),
    path("titleblock/", TitleBlockAPIView.as_view(), name="title-block"),
    path(
        "titleblock/<str:name>/", TitleBlockDetailAPIView.as_view(), name="title-block"
    ),
]
