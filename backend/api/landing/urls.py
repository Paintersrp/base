from django.urls import path
from .views import *


urlpatterns = [
    path("landing/", LandingFullView.as_view(), name="landing-full"),
    path("feature/", FeatureViewSet.as_view(), name="feature-list"),
    path("supportedsites/", SupportedSiteViewSet.as_view(), name="sites-list"),
    path("item/", ItemViewSet.as_view({"get": "list"}), name="item-list"),
    path(
        "item/<int:pk>/",
        ItemViewSet.as_view({"patch": "update", "put": "update"}),
        name="item2-list",
    ),
    path("testimonial/", TestimonialViewSet.as_view(), name="testimonial-list"),
    path("process/", ProcessViewSet.as_view(), name="process-list"),
    path("process/<int:pk>/", ProcessDetailViewSet.as_view(), name="process-detail"),
    path("heroblock/main/", HeroBlockMainAPIView.as_view(), name="heroblock-single"),
    path("heroblock/", HeroBlockAPIView.as_view(), name="heroblock-list"),
    path(
        "heroblock/<int:pk>/",
        HeroBlockDetailAPIView.as_view(),
        name="heroblock-detail",
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
        "servicetier/",
        ServiceTierView.as_view(),
        name="servicetier-list",
    ),
    path(
        "servicetier/<int:pk>/",
        ServiceTierDetailView.as_view(),
        name="servicetier-detail",
    ),
]
