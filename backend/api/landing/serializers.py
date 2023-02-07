from rest_framework import serializers
from .models import (
    HeroBlock,
    Feature,
    PricingPlan,
    SupportedSites,
)


class HeroBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBlock
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
