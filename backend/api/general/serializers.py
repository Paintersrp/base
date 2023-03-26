from rest_framework import serializers
from .models import *


class HeaderSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["page", "url", "title"]

    class Meta:
        model = Header
        fields = ["id", "image", "page", "url", "title", "keywords", "description"]


class ContentTextBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["slug", "title", "description"]

    class Meta:
        model = ContentTextBlock
        fields = ["id", "slug", "title", "description"]


ContentTextBlock.serializer_class = ContentTextBlockSerializer
Header.serializer_class = HeaderSerializer
