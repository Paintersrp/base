from django.urls import path
from .views import *

urlpatterns = [
    path("header/", HeaderListView.as_view(), name="header-list"),
    path("header/<int:pk>/", HeaderDetailView.as_view(), name="header-detail"),
    path(
        "header/<str:page>/",
        HeaderPageView.as_view(),
        name="header-search",
    ),
    path("appinfo/", AppInfoFullView.as_view(), name="app-full"),
]
