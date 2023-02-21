from rest_framework import generics
from .serializers import *
from .models import Jobs

class JobsListView(generics.ListCreateAPIView):
  queryset = Jobs.objects.all()
  serializer_class = JobsSerializer

class JobsDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Jobs.objects.all()
  serializer_class = JobsSerializer




