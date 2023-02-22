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
    HeroBlockMainAPIView,
)


router = DefaultRouter()
router.register(r"supported_sites", SupportedSiteViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("feature/", FeatureViewSet.as_view(), name="feature-list"),
    path("tile/", TileViewSet.as_view(), name="tile-list"),
    path("item/", ItemViewSet.as_view(), name="item-list"),
    path("testimonial/", TestimonialViewSet.as_view(), name="testimonial-list"),
    path("process/", ProcessViewSet.as_view(), name="process-list"),
    path("heroblock/main/", HeroBlockMainAPIView.as_view(), name="heroblock-single"),
    path("heroblock/", HeroBlockAPIView.as_view(), name="heroblock-list"),
    path("titleblock/", TitleBlockAPIView.as_view(), name="titleblock-list"),
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
