from rest_framework import serializers
from .models import *


class ServiceTableLabelsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "service_tier1",
        "service_tier2",
        "service_tier3",
        "name",
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
    FIELD_KEYS = ["detail", "tier1_value", "tier2_value", "tier3_value", "table_name"]

    class Meta:
        model = ServiceCompareRows
        fields = "__all__"


class ServiceTableSerializer(serializers.ModelSerializer):
    labels = serializers.StringRelatedField(source="service_table.id")
    rows = ServiceCompareRowsSerializer(many=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = ServiceTable
        fields = ["name", "labels", "rows"]


ServiceTable.serializer_class = ServiceTableSerializer
ServiceCompareRows.serializer_class = ServiceCompareRowsSerializer
ServiceTableLabels.serializer_class = ServiceTableLabelsSerializer
