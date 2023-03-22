from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from landing.models import ServiceTier
from tables.models import *
from tables.serializers import *
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes, get_serialized_page_data
from api.custom_views import *


class ServiceFullTestView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "ProcessTextItem": {
                "app_label": "services",
            },
            "ProcessImageItem": {
                "app_label": "services",
            },
            "ContactInformation": {
                "app_label": "contact",
                "get_first": True,
            },
            "Socials": {
                "app_label": "contact",
                "get_first": True,
            },
            "ServiceTier": {
                "app_label": "landing",
            },
            "ServiceTable": {
                "app_label": "tables",
                "filter": {"name__in": ["Tiers", "Competitors"]},
            },
            "TitleBlock": {
                "app_label": "landing",
                "filter": {"name": "benefits"},
            },
            "Benefits": {
                "app_label": "services",
            },
            "ContentTextBlock": {
                "app_label": "general",
                "filter": {"slug": "service-individual"},
            },
            "Questionnaire": {
                "app_label": "quizes",
                "filter": {"pk": 2},
            },
        }

        data = get_serialized_page_data(model_dict, request)

        return Response(data)


class BenefitsAPIView(BaseListView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class BenefitsDetailAPIView(BaseDetailView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class BenefitsBulkAPIView(BaseBulkView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    model_class = Benefits


class ProcessTextItemAPIView(BaseListView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


class ProcessTextItemDetailAPIView(BaseDetailView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


class ProcessTextItemBulkAPIView(BaseBulkView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer
    model_class = ProcessTextItem


class ProcessImageItemListView(generics.ListCreateAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def create(self, request, *args, **kwargs):

        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        process_image = ProcessImageItem.objects.create(
            servicetier=servicetier,
            image=request.data.get("image"),
        )
        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            process_image,
            None,
        )
        serializer = self.get_serializer(process_image)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProcessImageItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        instance = self.get_object()
        old_instance = ProcessImageItem.objects.get(pk=instance.pk)
        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            instance.image.storage.delete(instance.image.path)
            instance.image = image
        else:
            image = instance.image

        instance.servicetier = servicetier
        instance.image = image
        instance.save()
        changes = return_changes(instance, old_instance)
        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )
        serializer = self.get_serializer(instance)

        return Response(serializer.data)


class ProcessImageItemBulkAPIView(BaseBulkView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer
    model_class = ProcessImageItem
