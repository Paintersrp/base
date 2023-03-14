from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
from jobs.models import JobPosting
from about.models import ContactInformation
from rest_framework.response import Response


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

    def update(self, request, *args, **kwargs):
        header = self.get_object()
        form_data = request.POST
        page = form_data.get("page")
        title = form_data.get("title")
        description = form_data.get("description")
        keywords = form_data.get("keywords")
        url = form_data.get("url")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            header.image.storage.delete(header.image.path)
            header.image = image
        else:
            image = header.image

        data = {
            "page": page,
            "title": title,
            "description": description,
            "image": image,
            "keywords": keywords,
            "url": url,
        }

        serializer = HeaderSerializer(header, data=data)

        if serializer.is_valid():
            serializer.update(header, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)
