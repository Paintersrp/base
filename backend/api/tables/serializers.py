from rest_framework import serializers
from .models import *


class ServiceTableLabelsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "service_tier1",
        "service_tier2",
        "service_tier3",
    ]

    class Meta:
        model = ServiceTableLabels
        fields = [
            "id",
            "name",
            "service_tier1",
            "tier1_icon",
            "service_tier2",
            "tier2_icon",
            "service_tier3",
            "tier3_icon",
        ]


class ServiceCompareRowsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "table_name",
        "detail",
        "tier1_value",
        "tier2_value",
        "tier3_value",
    ]

    class Meta:
        model = ServiceCompareRows
        fields = "__all__"


class ServiceTableSerializer(serializers.ModelSerializer):
    labels = ServiceTableLabelsSerializer(required=False)
    rows = ServiceCompareRowsSerializer(many=True, required=False)
    FIELD_KEYS = ["name"]

    class Meta:
        model = ServiceTable
        fields = [
            "id",
            "name",
            "labels",
            "rows",
        ]


class CellSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["value", "column", "row"]

    class Meta:
        model = Cell
        fields = "__all__"


class RowSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True)
    FIELD_KEYS = ["cells"]

    class Meta:
        model = Row
        fields = ("id", "cells", "name")


class ColumnSerializer(serializers.ModelSerializer):
    rows = RowSerializer(many=True, read_only=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = Column
        fields = "__all__"


class TableSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)
    rows = RowSerializer(many=True, read_only=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = Table
        fields = [
            "id",
            "name",
            "columns",
            "rows",
        ]


class TableBuildSerializer(serializers.ModelSerializer):
    columns = serializers.ListField(child=serializers.DictField())
    rows = RowSerializer(many=True, read_only=True)

    class Meta:
        model = Table
        fields = ("name", "columns", "rows")

    # def create(self, validated_data):
    #     columns_data = validated_data.pop("columns")
    #     table = Table(**validated_data)
    #     table.save()

    #     created_rows = {}

    #     for column_data in columns_data:
    #         rows = column_data.pop("rows", [])
    #         column = Column.objects.create(table=table, **column_data)

    #         for row_data in rows:
    #             row_name = row_data.pop("name")
    #             cells_data = row_data.pop("cells", [])

    #             if row_name in created_rows:
    #                 row = created_rows[row_name]
    #             else:
    #                 row = Row.objects.create(table=table, name=row_name)
    #                 created_rows[row_name] = row

    #             for cell_data in cells_data:
    #                 # cell_data.pop("column_name")
    #                 cell = Cell.objects.create(column=column, row=row, **cell_data)

    #     table = Table.objects.get(id=table.id)

    #     return table


Table.serializer_class = TableSerializer
Column.serializer_class = ColumnSerializer
Row.serializer_class = RowSerializer
Cell.serializer_class = CellSerializer
ServiceTable.serializer_class = ServiceTableSerializer
ServiceCompareRows.serializer_class = ServiceCompareRowsSerializer
ServiceTableLabels.serializer_class = ServiceTableLabelsSerializer
