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


class TableAPIView(BaseListView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class TableDetailAPIView(BaseDetailView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class TableBulkAPIView(BaseBulkView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    model_class = Table


class ColumnAPIView(BaseListView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class ColumnDetailAPIView(BaseDetailView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class ColumnBulkAPIView(BaseBulkView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    model_class = Column


class RowAPIView(BaseListView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class RowDetailAPIView(BaseDetailView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class RowBulkAPIView(BaseBulkView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer
    model_class = Row


class CellAPIView(BaseListView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class CellDetailAPIView(BaseDetailView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class CellBulkAPIView(BaseBulkView):
    queryset = Cell.objects.all()
    serializer_class = CellSerializer
    model_class = Cell


class TableBuilder(generics.CreateAPIView):
    serializer_class = TableBuildSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        table = serializer.save()

        table = Table.objects.get(id=table.id)
        serializer = TableSerializer(instance=table, data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
