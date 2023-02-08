from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AboutBlockAPIView,
    MissionStatementAPIView,
    CompanyHistoryAPIView,
    AboutFullView,
    ValueViewSet,
)

router = DefaultRouter()
router.register(r"values", ValueViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("aboutblock/", AboutBlockAPIView.as_view(), name="about-block"),
    path("mission/", MissionStatementAPIView.as_view(), name="mission-statement"),
    path("history/", CompanyHistoryAPIView.as_view(), name="company-history"),
    path("about/", AboutFullView.as_view(), name="about-full"),
]
