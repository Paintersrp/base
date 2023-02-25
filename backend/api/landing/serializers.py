from rest_framework import serializers
from .models import (
    HeroBlock,
    Feature,
    PricingPlan,
    SupportedSites,
    Item,
    TitleBlock,
    Testimonial,
    Process,
)


class HeroBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "heading"]

    class Meta:
        model = HeroBlock
        fields = "__all__"


class TitleBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title"]

    class Meta:
        model = TitleBlock
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["buttonText", "buttonLink"]

    class Meta:
        model = Item
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Feature
        fields = "__all__"


class SupportedSitesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["site"]

    class Meta:
        model = SupportedSites
        fields = "__all__"


class PricingPlanSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True)
    supported_sites = SupportedSitesSerializer(many=True, read_only=True)
    FIELD_KEYS = ["title", "price"]

    class Meta:
        model = PricingPlan
        fields = "__all__"


class ProcessSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title"]

    class Meta:
        model = Process
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["heading"]

    class Meta:
        model = Testimonial
        fields = "__all__"


HeroBlock.serializer_class = HeroBlockSerializer
TitleBlock.serializer_class = TitleBlockSerializer
Item.serializer_class = ItemSerializer
Feature.serializer_class = FeatureSerializer
Process.serializer_class = ProcessSerializer
Testimonial.serializer_class = TestimonialSerializer
PricingPlan.serializer_class = PricingPlanSerializer
