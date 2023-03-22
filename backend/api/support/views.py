from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes
from api.custom_views import *


class SubscribersAPIView(BaseListView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer
    model_class = Subscribers


class SubscribersDetailAPIView(BaseDetailView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer
    model_class = Subscribers


class SubscribersBulkAPIView(BaseBulkView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer
    model_class = Subscribers


class MessagesAPIView(BaseListView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    model_class = Messages


class MessagesDetailAPIView(BaseDetailView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    model_class = Messages

    def retrieve(self, request, *args, **kwargs):
        unread_queryset = Messages.objects.filter(is_read=False)
        instance = self.get_object()
        instance.is_read = True
        instance.save()
        count = unread_queryset.count()
        serializer = self.get_serializer(instance)
        data = {"count": count, "messages": serializer.data}
        return Response(data)


class MessagesBulkAPIView(BaseBulkView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    model_class = Messages


class UnreadMessagesView(MessagesAPIView):
    def get_queryset(self):
        return Messages.objects.filter(is_read=False)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        count = queryset.count()
        serializer = self.get_serializer(queryset, many=True)
        data = {"count": count, "messages": serializer.data}
        return Response(data)
