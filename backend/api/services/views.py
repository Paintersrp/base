from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from contact.models import ContactInformation, Socials
from landing.models import ServiceTier, TitleBlock
from tables.models import *
from general.models import ContentTextBlock
from tables.serializers import *
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes
from api.custom_views import *


class ServiceFull(object):
    def __init__(
        self,
        process_text,
        process_image,
        contact_information,
        socials,
        service_tier,
        service_table_services,
        service_table_competitors,
        title_block_benefits,
        benefits,
        content_text_block,
    ):
        self.process_text = process_text
        self.process_image = process_image
        self.contact_information = contact_information
        self.socials = socials
        self.service_tier = service_tier
        self.service_table_services = service_table_services
        self.service_table_competitors = service_table_competitors
        self.title_block_benefits = title_block_benefits
        self.benefits = benefits
        self.content_text_block = content_text_block


class ServiceFullView(generics.GenericAPIView):
    serializer_class = ServiceViewSerializer

    def get(self, request, *args, **kwargs):
        process_text = ProcessTextItem.objects.all()
        process_image = ProcessImageItem.objects.all()
        contact_information = ContactInformation.objects.first()
        socials = Socials.objects.first()
        service_tier = ServiceTier.objects.all()
        service_table_services = ServiceTable.objects.get(name="Tiers")
        service_table_competitors = ServiceTable.objects.get(name="Competitors")
        title_block_benefits = TitleBlock.objects.get(name="benefits")
        benefits = Benefits.objects.all()
        content_text_block = ContentTextBlock.objects.get(slug="service-individual")

        service_full = ServiceFull(
            process_text,
            process_image,
            contact_information,
            socials,
            service_tier,
            service_table_services,
            service_table_competitors,
            title_block_benefits,
            benefits,
            content_text_block,
        )
        serializer = self.get_serializer(instance=service_full)

        return Response(serializer.data)


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
