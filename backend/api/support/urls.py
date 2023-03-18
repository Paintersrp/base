from django.urls import path
from .views import *

urlpatterns = [
    path("messages/", MessagesListView.as_view(), name="messages-list"),
    path("messages/<int:pk>/", MessagesDetailView.as_view(), name="messages-detail"),
    path("messages/unread/", UnreadMessagesView.as_view(), name="messages-detail"),
    path("subscribers/", SubscribersAPIView.as_view(), name="subscribers-list"),
    path(
        "subscribers/<int:pk>/",
        SubscribersDetailAPIView.as_view(),
        name="subscribers-detail",
    ),
]
