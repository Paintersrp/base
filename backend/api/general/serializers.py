from rest_framework import serializers
from .models import *
from jobs.serializers import JobPostingSerializer
from about.serializers import ContactInformationSerializer


class HeaderSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["page", "title", "keywords", "image"]

    class Meta:
        model = Header
        fields = ["id", "image", "page", "url", "title", "keywords", "description"]


class AppInfoFullSerializer(serializers.Serializer):
    contact_information = ContactInformationSerializer()
    jobs = JobPostingSerializer(many=True)


Header.serializer_class = HeaderSerializer
