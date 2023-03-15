from django.shortcuts import render
from rest_framework import generics, status
from .models import *
from .serializers import *
from django.http import JsonResponse
from jobs.models import JobPosting
from about.models import ContactInformation
from rest_framework.response import Response
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes


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


class HeaderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Header.objects.get(pk=instance.pk)

        image = request.FILES.get("image")
        if image is None or image == instance.image:
            data = request.data.copy()
            data["image"] = instance.image
        else:
            instance.image.delete()

            data = request.data

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
