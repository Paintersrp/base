from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
from jobs.models import JobPosting
from about.models import ContactInformation
from rest_framework.response import Response
from api.custom_views import *


class AppInfoFull(object):
    def __init__(
        self,
        contact_information,
        jobs,
    ):
        self.contact_information = contact_information
        self.jobs = jobs


class AppInfoFullView(generics.GenericAPIView):
    serializer_class = AppInfoFullSerializer

    def get(self, request, *args, **kwargs):
        contact_information = ContactInformation.objects.first()
        jobs = JobPosting.objects.filter(filled=False)
        landing_full = AppInfoFull(contact_information, jobs)
        serializer = self.get_serializer(instance=landing_full)

        return Response(serializer.data)


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
