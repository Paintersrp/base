from rest_framework import generics
from .serializers import *
from .models import JobPosting

class JobPostingListView(generics.ListCreateAPIView):
  queryset = JobPosting.objects.all()
  serializer_class = JobPostingSerializer

class JobPostingDetailView(generics.RetrieveUpdateDestroyAPIView):
  queryset = JobPosting.objects.all()
  serializer_class = JobPostingSerializer