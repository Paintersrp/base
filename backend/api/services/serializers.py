from rest_framework import serializers
from .models import *
from about.serializers import ContactInformationSerializer
from landing.serializers import ServiceTierSerializer
from landing.serializers import TitleBlockSerializer
from api.views import get_model_metadata
import re


class BenefitsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "description", "icon", "buttonText"]

    class Meta:
        model = Benefits
        fields = [
            "id",
            "icon",
            "title",
            "buttonText",
            "description",
        ]


class ProcessTextItemSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "description", "icon"]

    class Meta:
        model = ProcessTextItem
        fields = "__all__"


class ProcessImageItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    servicetier = serializers.StringRelatedField(source="servicetier.service_title")
    FIELD_KEYS = ["image", "servicetier"]

    class Meta:
        model = ProcessImageItem
        fields = "__all__"


class ServiceTableLabelsSerializer(serializers.ModelSerializer):
    service_tier1 = serializers.StringRelatedField(source="service_tier1.service_title")
    service_tier2 = serializers.StringRelatedField(source="service_tier2.service_title")
    service_tier3 = serializers.StringRelatedField(source="service_tier3.service_title")

    FIELD_KEYS = [
        "service_tier1",
        "service_tier2",
        "service_tier3",
    ]

    class Meta:
        model = ServiceTableLabels
        fields = [
            "id",
            "service_tier1",
            "tier1_icon",
            "service_tier2",
            "tier2_icon",
            "service_tier3",
            "tier3_icon",
        ]


class ServiceCompareRowsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["feature", "tier1_value", "tier2_value", "tier3_value"]

    class Meta:
        model = ServiceCompareRows
        fields = "__all__"


class ServiceCompareTableSerializer(serializers.Serializer):
    compare_labels = ServiceTableLabelsSerializer()
    compare_rows = ServiceCompareRowsSerializer(many=True)


class ServiceViewSerializer(serializers.Serializer):
    process_text = ProcessTextItemSerializer(many=True)
    process_image = ProcessImageItemSerializer(many=True)
    contact_information = ContactInformationSerializer()
    service_tier = ServiceTierSerializer(many=True)
    service_table_full = ServiceCompareTableSerializer()
    benefits = BenefitsSerializer(many=True)
    title_block_benefits = TitleBlockSerializer()
    metadata = serializers.SerializerMethodField()

    def get_metadata(self, obj):
        metadata = []
        for model in [
            "ProcessTextItem",
            "ProcessImageItem",
            "ContactInformation",
            "ServiceTier",
            "ServiceTableLabels",
            "ServiceCompareRows",
            "Benefits",
            "TitleBlock",
        ]:
            metadata.append(get_model_metadata(model))
        return metadata


ServiceCompareRows.serializer_class = ServiceCompareRowsSerializer
ServiceTableLabels.serializer_class = ServiceTableLabelsSerializer
ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
