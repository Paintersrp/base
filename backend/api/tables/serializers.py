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


ServiceTable.serializer_class = ServiceTableSerializer
ServiceCompareRows.serializer_class = ServiceCompareRowsSerializer
ServiceTableLabels.serializer_class = ServiceTableLabelsSerializer
