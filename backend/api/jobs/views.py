from rest_framework import generics
from .serializers import *
from .models import JobPosting
from rest_framework.response import Response
from django.http import JsonResponse


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

        print("test: ", data)

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
