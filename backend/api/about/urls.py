from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AboutBlockAPIView,
    MissionStatementAPIView,
    CompanyHistoryAPIView,
    AboutFullView,
    ValueViewSet,
    TeamMemberListCreateView,
    TeamMemberRetrieveUpdateDestroyView,
    ContactInformationAPIView,
    FAQRetrieveUpdateDestroyView,
    FAQListCreateView,
)

router = DefaultRouter()
router.register(r"values", ValueViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("faqs/", FAQListCreateView.as_view(), name="faqs-list"),
    path("faqs/<int:pk>/", FAQRetrieveUpdateDestroyView.as_view(), name="faqs-detail"),
    path("aboutblock/", AboutBlockAPIView.as_view(), name="about-block"),
    path("contact/", ContactInformationAPIView.as_view(), name="about-block"),
    path("mission/", MissionStatementAPIView.as_view(), name="mission-statement"),
    path("history/", CompanyHistoryAPIView.as_view(), name="company-history"),
    path("about/", AboutFullView.as_view(), name="about-full"),
    path("members/", TeamMemberListCreateView.as_view(), name="member-list"),
    path(
        "members/<int:pk>/",
        TeamMemberRetrieveUpdateDestroyView.as_view(),
        name="member-detail",
    ),
]
