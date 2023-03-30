from django.urls import path
from .views import *


urlpatterns = [
    path(
        "component/",
        ComponentAPIView.as_view(),
        name="component-list",
    ),
    path(
        "component/<int:pk>/",
        ComponentDetailAPIView.as_view(),
        name="component-detail",
    ),
    path(
        "component/bulk/",
        ComponentBulkAPIView.as_view(),
        name="component-bulk-detail",
    ),
    path("get-pages/", PageNameAPIView.as_view(), name="page-names"),
    path("page/", PageAPIView.as_view(), name="page-list"),
    path("page/<int:pk>/", PageDetailAPIView.as_view(), name="page-detail"),
    path(
        "page/bulk/",
        PageBulkAPIView.as_view(),
        name="page-bulk-detail",
    ),
    path(
        "get-page/<str:page_name>/",
        PageLookupAPIView.as_view(),
        name="page-lookup",
    ),
]
