from django.urls import path
from .views import *

urlpatterns = [
    path(
        "messages/",
        MessagesAPIView.as_view(),
        name="messages-list",
    ),
    path(
        "messages/<int:pk>/",
        MessagesDetailAPIView.as_view(),
        name="messages-detail",
    ),
    path(
        "messages/bulk/",
        MessagesBulkAPIView.as_view(),
        name="messages-bulk-detail",
    ),
    path(
        "messages/unread/",
        UnreadMessagesView.as_view(),
        name="messages-detail",
    ),
    path(
        "subscribers/",
        SubscribersAPIView.as_view(),
        name="subscribers-list",
    ),
    path(
        "subscribers/<int:pk>/",
        SubscribersDetailAPIView.as_view(),
        name="subscribers-detail",
    ),
    path(
        "subscribers/bulk/",
        SubscribersBulkAPIView.as_view(),
        name="subscribers-bulk-detail",
    ),
]
