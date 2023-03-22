from django.urls import path
from .views import *

urlpatterns = [
    path("jobposting/", JobPostingListView.as_view(), name="jobposting-list"),
    path("jobposting/all/", JobPostingAllListView.as_view()),
    path("jobposting/<int:pk>/", JobPostingDetailView.as_view()),
    path(
        "jobposting/bulk/",
        JobPostingBulkAPIView.as_view(),
        name="jobposting-bulk-detail",
    ),
    path("application/", ApplicationListView.as_view(), name="application-list"),
    path(
        "application/<int:pk>/",
        ApplicationDetailView.as_view(),
        name="application-detail",
    ),
    path(
        "application/bulk/",
        ApplicationBulkAPIView.as_view(),
        name="applicationapplication-bulk-detail",
    ),
    path(
        "responsibilities/",
        ResponsibilitiesAPIView.as_view(),
        name="responsibilities-ignore-list",
    ),
    path(
        "responsibilities/<int:pk>/",
        ResponsibilitiesDetailAPIView.as_view(),
        name="responsibilities-ignore-detail",
    ),
    path(
        "responsibilities/del/bulk/",
        ResponsibilitiesBulkAPIView.as_view(),
        name="responsibilities-ignore-bulk-detail",
    ),
]
