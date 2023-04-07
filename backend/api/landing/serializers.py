from rest_framework import serializers
import re
from .models import *
from contact.serializers import ContactInformationSerializer, SocialsSerializer
from articles.serializers import ArticleSerializer
from api.views import get_model_metadata


class HeroBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
        "heading",
    ]

    class Meta:
        model = HeroBlock
        fields = "__all__"


class TitleBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
        "subtitle",
    ]

    class Meta:
        model = TitleBlock
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Feature
        fields = "__all__"


class SupportedSitesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = SupportedSites
        fields = "__all__"


class ServiceTierSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True)
    supported_sites = SupportedSitesSerializer(many=True)
    FIELD_KEYS = [
        "service_title",
        "price",
        "image",
    ]

    class Meta:
        model = ServiceTier
        fields = "__all__"

    def format_data(self, data):
        formatted_data = {"features": [], "supported_sites": []}

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "features":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    feature_detail = value
                    formatted_data[name].append(feature_detail)

            elif name == "supported_sites":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    supported_site_detail = value
                    formatted_data[name].append(supported_site_detail)

            else:
                formatted_data[name] = value

        return formatted_data


class ProcessSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "description",
        "icon",
    ]

    class Meta:
        model = Process
        fields = "__all__"


class HeroSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = Hero
        fields = [
            "id",
            "name",
            "contact",
            "social",
            "hero_block",
        ]


class ProcessesSerializer(serializers.ModelSerializer):
    processes = ProcessSerializer(many=True, read_only=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = Processes
        fields = [
            "id",
            "name",
            "processes",
            "title_block",
        ]


class LatestNewsSerializer(serializers.ModelSerializer):
    latest_articles = ArticleSerializer(many=True, read_only=True)

    FIELD_KEYS = ["name"]

    class Meta:
        model = LatestNews
        fields = [
            "id",
            "name",
            "latest_articles",
            "title_block",
        ]


LatestNews.serializer_class = LatestNewsSerializer
Processes.serializer_class = ProcessesSerializer
Hero.serializer_class = HeroSerializer
HeroBlock.serializer_class = HeroBlockSerializer
TitleBlock.serializer_class = TitleBlockSerializer
Feature.serializer_class = FeatureSerializer
SupportedSites.serializer_class = SupportedSitesSerializer
Process.serializer_class = ProcessSerializer
ServiceTier.serializer_class = ServiceTierSerializer
