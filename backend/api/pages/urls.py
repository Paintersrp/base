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
    path(
        "componentmin/",
        ComponentObjMinAPIView.as_view(),
        name="componentobjmin-list",
    ),
    path(
        "componentobj/",
        ComponentObjAPIView.as_view(),
        name="componentobj-list",
    ),
    path(
        "componentobj/<int:pk>/",
        ComponentObjDetailAPIView.as_view(),
        name="componentobj-detail",
    ),
    path(
        "componentobj/bulk/",
        ComponentObjBulkAPIView.as_view(),
        name="componentobj-bulk-detail",
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
    path("pageobj/", PageObjAPIView.as_view(), name="pageobj-list"),
    path("pageobj/<int:pk>/", PageObjDetailAPIView.as_view(), name="pageobj-detail"),
    path(
        "pageobj/bulk/",
        PageObjBulkAPIView.as_view(),
        name="pageobj-bulk-detail",
    ),
    path(
        "get-pageobj/<str:page_name>/",
        PageObjLookupAPIView.as_view(),
        name="pageobj-lookup",
    ),
]
