from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from django.http import JsonResponse
from .serializers import *
from jobs.models import JobPosting
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes
from api.custom_views import *


class AboutFull(object):
    def __init__(
        self,
        about_block,
        mission_statement,
        company_history,
        core_values,
        team_members,
        contact_information,
        jobs,
    ):
        self.about_block = about_block
        self.mission_statement = mission_statement
        self.company_history = company_history
        self.core_values = core_values
        self.team_members = team_members
        self.contact_information = contact_information
        self.jobs = jobs


class AboutFullView(generics.GenericAPIView):
    serializer_class = AboutFullSerializer

    def get(self, request, *args, **kwargs):
        about_block = AboutBlock.objects.first()
        mission_statement = MissionStatement.objects.first()
        company_history = CompanyHistory.objects.first()
        core_values = Value.objects.all()
        team_members = TeamMember.objects.all()
        contact_information = ContactInformation.objects.first()
        jobs = JobPosting.objects.filter(filled=False)

        about_full = AboutFull(
            about_block,
            mission_statement,
            company_history,
            core_values,
            team_members,
            contact_information,
            jobs,
        )

        serializer = self.get_serializer(instance=about_full)

        return Response(serializer.data)


class AboutBlockAPIView(BaseListView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer
    model_class = AboutBlock


class AboutBlockDetailAPIView(BaseDetailView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer
    model_class = AboutBlock


class MissionStatementAPIView(BaseListView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer
    model_class = MissionStatement


class MissionStatementDetailAPIView(BaseDetailView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer
    model_class = MissionStatement


class CompanyHistoryAPIView(BaseListView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class CompanyHistoryDetailAPIView(BaseDetailView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class ContactInformationAPIView(BaseListView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    model_class = ContactInformation


class ContactInformationDetailAPIView(BaseDetailView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    model_class = ContactInformation


class FAQListCreateView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.POST
        category = form_data.get("category")
        question = form_data.get("question")
        answer = form_data.get("answer")

        data = {
            "category": category,
            "question": question,
            "answer": answer,
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            faq = serializer.create(validated_data=data)
            create_log_entry(
                LogEntry.Action.CREATE,
                request.username if request.username else None,
                faq,
                None,
            )

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)


class FAQRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def update(self, request, *args, **kwargs):
        faq = self.get_object()
        old_instance = FAQ.objects.get(pk=faq.pk)
        form_data = request.POST
        category = form_data.get("category")
        question = form_data.get("question")
        answer = form_data.get("answer")

        data = {
            "category": category,
            "question": question,
            "answer": answer,
        }

        serializer = FAQSerializer(faq, data=data)

        if serializer.is_valid():
            serializer.update(faq, validated_data=data)
            changes = return_changes(faq, old_instance)
            create_log_entry(
                LogEntry.Action.UPDATE,
                request.username if request.username else None,
                faq,
                changes,
            )

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)

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


class CategoryAPIView(BaseListView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    model_class = Category


class CategoryDetailAPIView(BaseDetailView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    model_class = Category


class ValueAPIView(BaseListView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value


class ValueDetailAPIView(BaseDetailView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value


class TeamMemberAPIView(BaseListView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    model_class = TeamMember


class TeamMemberDetailAPIView(BaseDetailView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    model_class = TeamMember
