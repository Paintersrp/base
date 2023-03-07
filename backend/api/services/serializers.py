from rest_framework import serializers
from .models import *
from about.serializers import ContactInformationSerializer
from landing.serializers import ServiceTierSerializer
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


class ServiceViewSerializer(serializers.Serializer):
    process_text = ProcessTextItemSerializer(many=True)
    process_image = ProcessImageItemSerializer(many=True)
    contact_information = ContactInformationSerializer()
    service_tier = ServiceTierSerializer(many=True)


ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
