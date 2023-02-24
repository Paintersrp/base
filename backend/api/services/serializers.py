from rest_framework import serializers
from .models import Benefits


class BenefitsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "description", "icon", "buttonText"]

    class Meta:
        model = Benefits
        fields = "__all__"


Benefits.serializer_class = BenefitsSerializer
