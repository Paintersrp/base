from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes


class SubscribersListView(generics.ListCreateAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class SubscribersDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Subscribers.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class MessagesListView(generics.ListCreateAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class UnreadMessagesView(MessagesListView):
    def get_queryset(self):
        return Messages.objects.filter(is_read=False)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        count = queryset.count()
        serializer = self.get_serializer(queryset, many=True)
        data = {"count": count, "messages": serializer.data}
        return Response(data)


class MessagesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer

    def retrieve(self, request, *args, **kwargs):
        unread_queryset = Messages.objects.filter(is_read=False)
        instance = self.get_object()
        instance.is_read = True
        instance.save()
        count = unread_queryset.count()
        serializer = self.get_serializer(instance)
        data = {"count": count, "messages": serializer.data}
        return Response(data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Messages.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)
