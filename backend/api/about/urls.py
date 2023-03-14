from django.urls import path
from .views import *

urlpatterns = [
    path("value/", ValueViewSet.as_view(), name="value-list"),
    path("value/<int:pk>/", ValueDetailViewSet.as_view(), name="value-detail"),
    path("category/", CategoryAPIView.as_view(), name="category-list"),
    path("category/<int:pk>/", CategoryDetailAPIView.as_view(), name="category-detail"),
    path("faq/", FAQListCreateView.as_view(), name="faq-list"),
    path("faq/<int:pk>/", FAQRetrieveUpdateDestroyView.as_view(), name="faqs-detail"),
    path("aboutblock/", AboutBlockAPIView.as_view(), name="aboutblock-list"),
    path(
        "aboutblock/<int:pk>/",
        AboutBlockDetailAPIView.as_view(),
        name="aboutblock-detail",
    ),
    path(
        "contactinformation/",
        ContactInformationAPIView.as_view(),
        name="contactinformation-list",
    ),
    path(
        "contactinformation/<int:pk>/",
        ContactInformationDetailAPIView.as_view(),
        name="contactinformation-list",
    ),
    path(
        "missionstatement/",
        MissionStatementAPIView.as_view(),
        name="missionstatement-list",
    ),
    path(
        "missionstatement/<int:pk>/",
        MissionStatementDetailAPIView.as_view(),
        name="missionstatement-update",
    ),
    path(
        "companyhistory/",
        CompanyHistoryAPIView.as_view(),
        name="companyhistory-list",
    ),
    path(
        "companyhistory/<int:pk>/",
        CompanyHistoryDetailAPIView.as_view(),
        name="companyhistory-update",
    ),
    path("about/", AboutFullView.as_view(), name="about-full"),
    path("teammember/", TeamMemberListCreateView.as_view(), name="teammember-list"),
    path(
        "members/<int:pk>/",
        TeamMemberRetrieveUpdateDestroyView.as_view(),
        name="member-detail",
    ),
]
