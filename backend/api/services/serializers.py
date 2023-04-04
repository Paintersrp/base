from rest_framework import serializers
from .models import *
from general.serializers import ContentTextBlockSerializer
from tables.serializers import ServiceTableSerializer
from contact.serializers import ContactInformationSerializer, SocialsSerializer
from landing.serializers import ServiceTierSerializer, TitleBlockSerializer
from quizes.serializers import QuestionnaireSerializer
from api.views import get_model_metadata


class BenefitsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "page_link",
    ]

    class Meta:
        model = Benefits
        fields = [
            "id",
            "icon",
            "title",
            "page_link",
            "description",
            "buttonText",
        ]


class ProcessTextItemSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "icon",
    ]

    class Meta:
        model = ProcessTextItem
        fields = "__all__"


class ProcessImageItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    servicetier = serializers.StringRelatedField(source="servicetier.service_title")
    FIELD_KEYS = [
        "image",
        "servicetier",
    ]

    class Meta:
        model = ProcessImageItem
        fields = "__all__"


class QuizSerializer(serializers.ModelSerializer):
    benefits = BenefitsSerializer(many=True)
    title_block = TitleBlockSerializer()
    service_tiers = ServiceTierSerializer(many=True)
    tiers_table = ServiceTableSerializer()
    competitors_table = ServiceTableSerializer()
    questionnaire = QuestionnaireSerializer()
    FIELD_KEYS = ["name"]

    class Meta:
        model = Quiz
        fields = [
            "name",
            "benefits",
            "title_block",
            "service_tiers",
            "tiers_table",
            "competitors_table",
            "questionnaire",
        ]


Quiz.serializer_class = QuizSerializer
ProcessImageItem.serializer_class = ProcessImageItemSerializer
ProcessTextItem.serializer_class = ProcessTextItemSerializer
Benefits.serializer_class = BenefitsSerializer
