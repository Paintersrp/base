from django.urls import path
from .views import *

urlpatterns = [
  path('jobposting/', JobPostingListView.as_view()),
  path('jobposting/<int:pk>/', JobPostingDetailView.as_view()),
]
