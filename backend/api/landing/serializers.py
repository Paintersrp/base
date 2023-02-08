from rest_framework import serializers
from .models import (
    HeroBlock,
    Feature,
    PricingPlan,
    SupportedSites,
    Tile,
    Item,
    TitleBlock,
    Testimonial,
    Process,
)


class HeroBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBlock
        fields = "__all__"


class TitleBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleBlock
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = "__all__"


class SupportedSitesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportedSites
        fields = "__all__"


class PricingPlanSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True)
    supportedsites = SupportedSitesSerializer(many=True, read_only=True)

    class Meta:
        model = PricingPlan
        fields = "__all__"


class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = "__all__"


class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"
