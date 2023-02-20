from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroBlockAPIView,
    PricingPlanListCreateView,
    PricingPlanRetrieveUpdateDestroy,
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
    path(
        "pricing_plans/",
        PricingPlanListCreateView.as_view(),
        name="article-list-create",
    ),
    path(
        "pricing_plans/<int:pk>/",
        PricingPlanRetrieveUpdateDestroy.as_view(),
        name="article-detail-update-delete",
    ),
]
