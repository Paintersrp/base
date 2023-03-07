from django.urls import path
from .views import *


urlpatterns = [
    path("benefits/", BenefitsViewSet.as_view(), name="benefits-list"),
    path("benefits/<int:pk>/", BenefitsViewSet.as_view(), name="benefits-detail"),
    path(
        "processtextitem/",
        ProcessTextItemListView.as_view(),
        name="processtextitem-list",
    ),
    path(
        "processtextitem/<int:pk>/",
        ProcessTextItemDetailView.as_view(),
        name="processtextitem-detail",
    ),
    path(
        "processimageitem/",
        ProcessImageItemListView.as_view(),
        name="processimageitem-list",
    ),
    path(
        "processimageitem/<int:pk>/",
        ProcessImageItemDetailView.as_view(),
        name="processimageitem-detail",
    ),
    path("services/", ServiceFullView.as_view(), name="service-full"),
]
