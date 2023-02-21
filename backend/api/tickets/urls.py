from django.urls import path
from .views import *

urlpatterns = [
    path("message/", MessageListView.as_view()),
    path("message/<int:pk>/", MessageDetailView.as_view()),
]
