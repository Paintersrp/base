from rest_framework import serializers
from .models import *
from tables.serializers import ServiceTableSerializer
from about.serializers import ContactInformationSerializer
from landing.serializers import ServiceTierSerializer, TitleBlockSerializer
from api.views import get_model_metadata


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


class ServiceViewSerializer(serializers.Serializer):
    process_text = ProcessTextItemSerializer(many=True)
    process_image = ProcessImageItemSerializer(many=True)
    contact_information = ContactInformationSerializer()
    service_tier = ServiceTierSerializer(many=True)
    service_table_services = ServiceTableSerializer()
    service_table_competitors = ServiceTableSerializer()
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


ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
