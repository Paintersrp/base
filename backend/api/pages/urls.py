from django.urls import path
from .views import *


urlpatterns = [
    path(
        "app/",
        AppAPIView.as_view(),
        name="app-list",
    ),
    path(
        "app/<int:pk>/",
        AppDetailAPIView.as_view(),
        name="app-detail",
    ),
    path(
        "app/bulk/",
        AppBulkAPIView.as_view(),
        name="app-bulk-detail",
    ),
    path(
        "get-app/<str:app_name>/",
        AppLookupAPIView.as_view(),
        name="app-lookup",
    ),
    path(
        "pageset/",
        PageSetAPIView.as_view(),
        name="pageset-list",
    ),
    path(
        "pageset/<int:pk>/",
        PageSetDetailAPIView.as_view(),
        name="pageset-detail",
    ),
    path(
        "pageset/bulk/",
        PageSetBulkAPIView.as_view(),
        name="pageset-bulk-detail",
    ),
    path(
        "componentcategory/",
        ComponentCategoryAPIView.as_view(),
        name="componentcategory-list",
    ),
    path(
        "componentcategory/<int:pk>/",
        ComponentCategoryDetailAPIView.as_view(),
        name="componentcategory-detail",
    ),
    path(
        "componentcategory/bulk/",
        ComponentCategoryBulkAPIView.as_view(),
        name="componentcategory-bulk-detail",
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
    path(
        "pageobj/",
        PageObjAPIView.as_view(),
        name="pageobj-list",
    ),
    path(
        "pageobj/<int:pk>/",
        PageObjDetailAPIView.as_view(),
        name="pageobj-detail",
    ),
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
