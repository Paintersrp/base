from django.urls import path
from .views import *

urlpatterns = [
    path("jobs/", JobsListView.as_view()),
    path("jobs/<int:pk>/", JobsDetailView.as_view()),
]
