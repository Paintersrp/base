from django.urls import path
from .views import *

urlpatterns = [
    path("messages/", MessagesListView.as_view(), name="messages-list"),
    path("messages/<int:pk>/", MessagesDetailView.as_view(), name="messages-detail"),
    path("subscribers/", SubscriberListView.as_view(), name="subscriber-list"),
    path(
        "subscribers/<int:pk>/",
        SubscriberDetailView.as_view(),
        name="subscriber-detail",
    ),
]
