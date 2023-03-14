from rest_framework import generics
from .serializers import *
from .models import *
from rest_framework.response import Response


class SubscribersListView(generics.ListCreateAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer


class SubscribersDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer


class MessagesListView(generics.ListCreateAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer


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
