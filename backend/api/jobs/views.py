from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes
from api.custom_views import *


class JobPostingListView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.filter(filled=False)
    serializer_class = JobPostingSerializer

    def create(self, request, *args, **kwargs):
        formatted_data = self.serializer_class().format_data(request.data)
        requirements_list = formatted_data.get("requirements", [])
        responsibilities_list = formatted_data.get("responsibilities", [])

        requirement_objs = []
        for requirement in requirements_list:
            requirement_obj, created = Requirement.objects.get_or_create(
                detail=requirement
            )
            requirement_objs.append(requirement_obj)

        responsibility_objs = []
        for responsibility in responsibilities_list:
            print(responsibility)
            responsibility_obj, created = Responsibilities.objects.get_or_create(
                detail=responsibility
            )
            responsibility_objs.append(responsibility_obj)

        filled_status = False

        job_posting = JobPosting.objects.create(
            position=formatted_data.get("position"),
            location=formatted_data.get("location"),
            type=formatted_data.get("type"),
            tagline=formatted_data.get("tagline"),
            who_we_are=formatted_data.get("who_we_are"),
            looking_for=formatted_data.get("looking_for"),
            why_apply=formatted_data.get("why_apply"),
            filled=filled_status,
        )

        job_posting.requirements.set(requirement_objs)
        job_posting.responsibilities.set(responsibility_objs)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            job_posting,
            None,
        )

        serializer = self.get_serializer(job_posting)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class JobPostingAllListView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer


class JobPostingDetailView(BaseDetailView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    model_class = JobPosting

    # look to pricing for create function if necessary

    def update(self, request, *args, **kwargs):
        print(request.data)
        instance = self.get_object()
        old_instance = JobPosting.objects.get(pk=instance.pk)
        formatted_data = self.serializer_class().format_data(request.data)
        print(formatted_data)

        requirements_list = formatted_data.get("requirements", [])
        responsibilities_list = formatted_data.get("responsibilities", [])

        requirement_objs = []
        for requirement in requirements_list:
            requirement_obj, created = Requirement.objects.get_or_create(
                detail=requirement
            )
            requirement_objs.append(requirement_obj)

        responsibility_objs = []
        for responsibility in responsibilities_list:
            print(responsibility)
            responsibility_obj, created = Responsibilities.objects.get_or_create(
                detail=responsibility
            )
            responsibility_objs.append(responsibility_obj)

        filled_status = formatted_data.get("filled", instance.filled)

        if filled_status == "false":
            filled_status = False
        elif filled_status == "true":
            filled_status = True

        instance.position = formatted_data.get("position", instance.position)
        instance.location = formatted_data.get("location", instance.location)
        instance.type = formatted_data.get("type", instance.type)
        instance.tagline = formatted_data.get("tagline", instance.tagline)
        instance.who_we_are = formatted_data.get("who_we_are", instance.who_we_are)
        instance.why_apply = formatted_data.get("why_apply", instance.why_apply)
        instance.looking_for = formatted_data.get("looking_for", instance.looking_for)
        instance.filled = filled_status
        instance.save()
        instance.requirements.set(requirement_objs)
        instance.responsibilities.set(responsibility_objs)
        serializer = self.get_serializer(instance)

        changes = return_changes(instance, old_instance)
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)


class JobPostingBulkAPIView(BaseBulkView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    model_class = JobPosting


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

        serializer = ApplicationSerializer(data=data)

        if serializer.is_valid():
            serializer.create(validated_data=data)
            instance = serializer.save()
            create_log_entry(
                LogEntry.Action.CREATE,
                request.username if request.username else None,
                instance,
                None,
            )

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)

    def perform_create(self, serializer):
        print(self.request.data)
        resume = self.request.data.get("resume")
        serializer.save(resume=resume)


class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        job_serializer = JobPostingSerializer(instance.job)
        serialized_job = job_serializer.data

        data = {"job": serialized_job, "application": serializer.data}
        return Response(data)

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
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicationBulkAPIView(BaseBulkView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    model_class = Application


class ResponsibilitiesAPIView(BaseListView):
    queryset = Responsibilities.objects.all()
    serializer_class = ResponsibilitiesSerializer
    model_class = Responsibilities


class ResponsibilitiesDetailAPIView(BaseDetailView):
    queryset = Responsibilities.objects.all()
    serializer_class = ResponsibilitiesSerializer
    model_class = Responsibilities


class ResponsibilitiesBulkAPIView(BaseBulkView):
    queryset = Responsibilities.objects.all()
    serializer_class = ResponsibilitiesSerializer
    model_class = Responsibilities
