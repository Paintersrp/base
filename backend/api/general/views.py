from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
from jobs.models import JobPosting
from contact.models import ContactInformation
from rest_framework.response import Response
from api.custom_views import *


class HeaderAPIView(BaseListView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer
    model_class = Header


class HeaderDetailAPIView(BaseDetailView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer
    model_class = Header


class HeaderBulkAPIView(BaseBulkView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer
    model_class = Header


class HeaderPageView(BaseDetailView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer
    model_class = Header
    lookup_field = "page"


class ContentTextBlockAPIView(BaseListView):
    queryset = ContentTextBlock.objects.all()
    serializer_class = ContentTextBlockSerializer
    model_class = ContentTextBlock


class ContentTextBlockDetailAPIView(BaseDetailView):
    queryset = ContentTextBlock.objects.all()
    serializer_class = ContentTextBlockSerializer
    model_class = ContentTextBlock


class ContentTextBlockBulkAPIView(BaseBulkView):
    queryset = ContentTextBlock.objects.all()
    serializer_class = ContentTextBlockSerializer
    model_class = ContentTextBlock


class ContentTextBlockPageView(BaseDetailView):
    queryset = ContentTextBlock.objects.all()
    serializer_class = ContentTextBlockSerializer
    model_class = ContentTextBlock
    lookup_field = "slug"
