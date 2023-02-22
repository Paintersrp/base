from django.urls import path
from .views import *

urlpatterns = [
    path("jobposting/", JobPostingListView.as_view(), name="jobposting-list"),
    path("jobposting/all/", JobPostingAllListView.as_view()),
    path("jobposting/<int:pk>/", JobPostingDetailView.as_view()),
]
