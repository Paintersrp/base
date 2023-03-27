from rest_framework import generics, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes
from api.custom_views import *
from django.shortcuts import get_object_or_404


class ServiceTableLabelsListView(BaseListView):
    queryset = ServiceTableLabels.objects.all()
    serializer_class = ServiceTableLabelsSerializer
    model_class = ServiceTableLabels

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

    def get_queryset(self):
        return self.model_class.objects.all()


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


class ServiceTableLabelsBulkAPIView(BaseBulkView):
    queryset = ServiceTableLabels.objects.all()
    serializer_class = ServiceTableLabelsSerializer
    model_class = ServiceTableLabels


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


class ServiceCompareRowsBulkAPIView(BaseBulkView):
    queryset = ServiceCompareRows.objects.all()
    serializer_class = ServiceCompareRowsSerializer
    model_class = ServiceCompareRows


class ServiceTableAPIView(BaseListView):
    queryset = ServiceTable.objects.all()
    serializer_class = ServiceTableSerializer
    model_class = ServiceTable


class ServiceTableDetailAPIView(BaseDetailView):
    queryset = ServiceTable.objects.all()
    serializer_class = ServiceTableSerializer
    model_class = ServiceTable

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        labels = get_object_or_404(ServiceTableLabels, id=data.get("labels"))
        print(labels)

        data["labels"] = labels
        rows_data = data.pop("rows", [])
        print(data)

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


class ServiceTableBulkAPIView(BaseBulkView):
    queryset = ServiceTable.objects.all()
    serializer_class = ServiceTableSerializer
    model_class = ServiceTable
