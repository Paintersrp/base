from django.urls import path
from .views import *

urlpatterns = [
    path(
        "header/",
        HeaderAPIView.as_view(),
        name="header-list",
    ),
    path(
        "header/<int:pk>/",
        HeaderDetailAPIView.as_view(),
        name="header-detail",
    ),
    path(
        "header/<str:page>/",
        HeaderPageView.as_view(),
        name="header-search",
    ),
    path(
        "header/del/bulk/",
        HeaderBulkAPIView.as_view(),
        name="header-bulk-detail",
    ),
    path(
        "contenttextblock/",
        ContentTextBlockAPIView.as_view(),
        name="contenttextblock-list",
    ),
    path(
        "contenttextblock/<int:pk>/",
        ContentTextBlockDetailAPIView.as_view(),
        name="contenttextblock-detail",
    ),
    path(
        "contenttextblock/<str:page>/",
        ContentTextBlockPageView.as_view(),
        name="contenttextblock-search",
    ),
    path(
        "contenttextblock/del/bulk/",
        ContentTextBlockBulkAPIView.as_view(),
        name="contenttextblock-bulk-detail",
    ),
]
