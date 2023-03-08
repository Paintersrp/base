from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *


class HeaderListView(generics.ListCreateAPIView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer


class HeaderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer


class HeaderPageView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer
    lookup_field = "page"
