from django.urls import path
from .views import *


urlpatterns = [
    path("landing/", LandingFullTestView.as_view(), name="landing-full"),
    path("feature/", FeatureAPIView.as_view(), name="feature-list"),
    path(
        "feature/<int:pk>/",
        FeatureDetailAPIView.as_view(),
        name="feature-detail",
    ),
    path(
        "feature/bulk/",
        FeatureBulkAPIView.as_view(),
        name="feature-bulk-detail",
    ),
    path(
        "supportedsites/", SupportedSitesAPIView.as_view(), name="supportedsites-list"
    ),
    path(
        "supportedsites/<int:pk>/",
        SupportedSitesDetailAPIView.as_view(),
        name="supportedsites-detail",
    ),
    path(
        "supportedsites/bulk/",
        SupportedSitesBulkAPIView.as_view(),
        name="supportedsites-bulk-detail",
    ),
    path("item/", ItemViewSet.as_view({"get": "list"}), name="item-ignore-list"),
    path(
        "item/<int:pk>/",
        ItemViewSet.as_view({"patch": "update", "put": "update"}),
        name="item2-list",
    ),
    path("testimonial/", TestimonialAPIView.as_view(), name="testimonial-ignore-list"),
    path(
        "testimonial/<int:pk>/",
        TestimonialDetailAPIView.as_view(),
        name="testimonial-ignore-detail",
    ),
    path(
        "testimonial/bulk/",
        TestimonialBulkAPIView.as_view(),
        name="testimonial-bulk-detail",
    ),
    path("process/", ProcessAPIView.as_view(), name="process-list"),
    path("process/<int:pk>/", ProcessDetailAPIView.as_view(), name="process-detail"),
    path(
        "process/bulk/",
        ProcessBulkAPIView.as_view(),
        name="process-bulk-detail",
    ),
    path("heroblock/main/", HeroBlockMainAPIView.as_view(), name="heroblock-single"),
    path("heroblock/", HeroBlockAPIView.as_view(), name="heroblock-list"),
    path(
        "heroblock/<int:pk>/",
        HeroBlockDetailAPIView.as_view(),
        name="heroblock-detail",
    ),
    path(
        "heroblock/bulk/",
        HeroBlockBulkAPIView.as_view(),
        name="heroblock-bulk-detail",
    ),
    path("titleblock/", TitleBlockAPIView.as_view(), name="titleblock-list"),
    path(
        "titleblock/<int:pk>/",
        TitleBlockUpdateAPIView.as_view(),
        name="titleblock-update",
    ),
    path(
        "titleblock/<str:name>/",
        TitleBlockDetailAPIView.as_view(),
        name="titleblock-search",
    ),
    path(
        "titleblock/del/bulk/",
        TitleBlockBulkAPIView.as_view(),
        name="titleblock-bulk-detail",
    ),
    path(
        "servicetier/",
        ServiceTierView.as_view(),
        name="servicetier-list",
    ),
    path(
        "servicetier/<int:pk>/",
        ServiceTierDetailView.as_view(),
        name="servicetier-detail",
    ),
    path(
        "servicetier/bulk/",
        ServiceTierBulkAPIView.as_view(),
        name="servicetier-bulk-detail",
    ),
]
