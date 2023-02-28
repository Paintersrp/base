from rest_framework import generics
from .serializers import *
from .models import Messages


class MessagesListView(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView
):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
