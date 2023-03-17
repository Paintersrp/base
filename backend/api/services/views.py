from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from authorization.authentication import JWTTokenAuthentication
from api.signals import log_changes
from rest_framework.response import Response
from .models import *
from .serializers import *
from about.models import ContactInformation
from landing.models import ServiceTier, TitleBlock
from django.shortcuts import get_object_or_404
from auditlog.models import LogEntry
from api.utilities import create_log_entry, return_changes


class ServiceFull(object):
    def __init__(
        self,
        process_text,
        process_image,
        contact_information,
        service_tier,
        service_table_full,
        title_block_benefits,
        benefits,
    ):
        self.process_text = process_text
        self.process_image = process_image
        self.contact_information = contact_information
        self.service_tier = service_tier
        self.service_table_full = service_table_full
        self.title_block_benefits = title_block_benefits
        self.benefits = benefits


class ServiceFullView(generics.GenericAPIView):
    serializer_class = ServiceViewSerializer

    def get(self, request, *args, **kwargs):
        process_text = ProcessTextItem.objects.all()
        process_image = ProcessImageItem.objects.all()
        contact_information = ContactInformation.objects.first()
        service_tier = ServiceTier.objects.all()
        compare_labels = ServiceTableLabels.objects.first()
        compare_rows = ServiceCompareRows.objects.all()
        service_table_full = ServiceCompareTable(compare_labels, compare_rows)
        title_block_benefits = TitleBlock.objects.get(name="benefits")
        benefits = Benefits.objects.all()

        service_full = ServiceFull(
            process_text,
            process_image,
            contact_information,
            service_tier,
            service_table_full,
            title_block_benefits,
            benefits,
        )
        serializer = self.get_serializer(instance=service_full)

        return Response(serializer.data)


class ServiceCompareTable(object):
    def __init__(self, compare_labels, compare_rows):
        self.compare_labels = compare_labels
        self.compare_rows = compare_rows


class ServiceCompareTableView(generics.GenericAPIView):
    serializer_class = ServiceCompareTableSerializer

    def get(self, request, *args, **kwargs):
        compare_labels = ServiceTableLabels.objects.first()
        compare_rows = ServiceCompareRows.objects.all()

        service_table_full = ServiceCompareTable(compare_labels, compare_rows)
        serializer = self.get_serializer(instance=service_table_full)

        return Response(serializer.data)


class BenefitsViewSet(generics.ListCreateAPIView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class BenefitsDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Benefits.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
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


class ProcessTextItemListView(generics.ListCreateAPIView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class ProcessTextItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ProcessTextItem.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
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


class ServiceTableLabelsListView(generics.ListCreateAPIView):
    queryset = ServiceTableLabels.objects.all()
    serializer_class = ServiceTableLabelsSerializer


class ServiceTableLabelsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceTableLabels.objects.all()
    serializer_class = ServiceTableLabelsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ServiceTableLabels.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
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


class ServiceCompareRowsListView(generics.ListCreateAPIView):
    queryset = ServiceCompareRows.objects.all()
    serializer_class = ServiceCompareRowsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class ServiceCompareRowsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceCompareRows.objects.all()
    serializer_class = ServiceCompareRowsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ServiceCompareRows.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
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
