from rest_framework import generics
from .serializers import *
from .models import *


class SubscribersListView(generics.ListCreateAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer


class SubscribersDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer


class MessagesListView(generics.ListCreateAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer


class MessagesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
