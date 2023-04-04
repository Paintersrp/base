from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from django.http import JsonResponse
from .serializers import *
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes, get_serialized_page_data
from api.custom_views import *


class AboutFullView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "AboutBlock": {
                "app_label": "about",
                "get_first": True,
            },
            "MissionStatement": {
                "app_label": "about",
                "get_first": True,
            },
            "CompanyHistory": {
                "app_label": "about",
                "get_first": True,
            },
            "Value": {
                "app_label": "about",
            },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class AboutBlockAPIView(BaseListView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer
    model_class = AboutBlock


class AboutBlockDetailAPIView(BaseDetailView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer
    model_class = AboutBlock


class AboutBlockBulkAPIView(BaseBulkView):
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


class MissionStatementBulkAPIView(BaseBulkView):
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


class CompanyHistoryBulkAPIView(BaseBulkView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer
    model_class = CompanyHistory


class FAQListCreateView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def create(self, request, *args, **kwargs):
        data = {
            "category": request.POST.get("category"),
            "question": request.POST.get("question"),
            "answer": request.POST.get("answer"),
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        faq = serializer.create(validated_data=data)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            faq,
            None,
        )

        headers = self.get_success_headers(serializer.data)

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


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
        name = form_data.get("name")

        data = {
            "category": category,
            "question": question,
            "answer": answer,
            "name": name,
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


class FAQBulkAPIView(BaseBulkView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    model_class = FAQ


class CategoryAPIView(BaseListView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    model_class = Category


class CategoryDetailAPIView(BaseDetailView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    model_class = Category


class CategoryBulkAPIView(BaseBulkView):
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


class ValueBulkAPIView(BaseBulkView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    model_class = Value
