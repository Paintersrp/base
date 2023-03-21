from django.urls import path
from .views import *

urlpatterns = [
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
        "contactinformation/bulk/",
        ContactInformationBulkAPIView.as_view(),
        name="contactinformation-bulk-detail",
    ),
    path(
        "hours/",
        HoursAPIView.as_view(),
        name="hours-list",
    ),
    path(
        "hours/<int:pk>/",
        HoursDetailAPIView.as_view(),
        name="hours-update",
    ),
    path(
        "hours/bulk/",
        HoursBulkAPIView.as_view(),
        name="hours-bulk-detail",
    ),
    path(
        "socials/",
        SocialsAPIView.as_view(),
        name="socials-list",
    ),
    path(
        "socials/<int:pk>/",
        SocialsDetailAPIView.as_view(),
        name="socials-update",
    ),
    path(
        "socials/bulk/",
        SocialsBulkAPIView.as_view(),
        name="socials-bulk-detail",
    ),
    path("teammember/", TeamMemberAPIView.as_view(), name="teammember-list"),
    path(
        "teammember/<int:pk>/",
        TeamMemberDetailAPIView.as_view(),
        name="teammember-detail",
    ),
    path(
        "teammember/bulk/",
        TeamMemberBulkAPIView.as_view(),
        name="teammember-bulk-detail",
    ),
    path("appinfo/", AppInfoFullView.as_view(), name="app-full"),
]
