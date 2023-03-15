from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes


class JobPostingListView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.filter(filled=False)
    serializer_class = JobPostingSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.POST
        position = form_data.get("position")
        location = form_data.get("location")
        type = form_data.get("type")
        tagline = form_data.get("tagline")
        who_we_are = form_data.get("who_we_are")
        why_apply = form_data.get("why_apply")
        looking_for = form_data.get("looking_for")
        requirements = form_data.get("requirements[]")
        responsibilities = form_data.get("responsibilities[]")

        data = {
            "position": position,
            "location": location,
            "type": type,
            "tagline": tagline,
            "who_we_are": who_we_are,
            "why_apply": why_apply,
            "looking_for": looking_for,
            "requirements": requirements,
            "responsibilities": responsibilities,
        }

        if isinstance(data.get("requirements"), str):
            requirements = data["requirements"].split(",")
            data["requirements"] = [{"detail": item.strip()} for item in requirements]

        if isinstance(data.get("responsibilities"), str):
            responsibilities = data["responsibilities"].split(",")
            data["responsibilities"] = [
                {"detail": item.strip()} for item in responsibilities
            ]

        serializer = JobPostingSerializer(data=data)

        if serializer.is_valid():
            serializer.create(validated_data=data)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)


class JobPostingAllListView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer


class JobPostingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer


class ApplicationListView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationListView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.data
        first_name = form_data.get("first_name")
        last_name = form_data.get("last_name")
        email = form_data.get("email")
        phone = form_data.get("phone")
        city = form_data.get("city")
        zipcode = form_data.get("zipcode")
        job = get_object_or_404(JobPosting, position=form_data.get("job"))
        resume = request.FILES.get("resume")

        data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone": phone,
            "city": city,
            "zipcode": zipcode,
            "job": job,
            "resume": resume,
        }

        print(data)

        serializer = ApplicationSerializer(data=data)

        if serializer.is_valid():
            serializer.create(validated_data=data)
            instance = serializer.save()
            create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)

    def perform_create(self, serializer):
        print(self.request.data)
        resume = self.request.data.get("resume")
        serializer.save(resume=resume)


class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Application.objects.get(pk=instance.pk)
        resume = request.FILES.get("resume")

        if resume is None:
            data = request.data.copy()
            data["resume"] = instance.resume
        else:
            instance.resume.delete()

            data = request.data

        serializer = self.get_serializer(instance, data=data, partial=True)
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
