from django.urls import path
from .views import *

urlpatterns = [
    path("header/", HeaderAPIView.as_view(), name="header-list"),
    path("header/<int:pk>/", HeaderDetailAPIView.as_view(), name="header-detail"),
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
    path("appinfo/", AppInfoFullView.as_view(), name="app-full"),
]
