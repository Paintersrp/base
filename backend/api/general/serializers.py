from rest_framework import serializers
from .models import *


class HeaderSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["page", "title", "keywords"]

    class Meta:
        model = Header
        fields = ["id", "image", "page", "url", "title", "keywords", "description"]


Header.serializer_class = HeaderSerializer
