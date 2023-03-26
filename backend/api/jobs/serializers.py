from rest_framework import serializers
from .models import *
import re


class ResponsibilitiesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Responsibilities
        fields = "__all__"


class RequirementSerializer(serializers.ModelSerializer):
    detail = serializers.CharField(
        max_length=200,
    )
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Requirement
        fields = "__all__"


class JobPostingSerializer(serializers.ModelSerializer):
    requirements = RequirementSerializer(many=True, read_only=False)
    responsibilities = ResponsibilitiesSerializer(many=True, read_only=False)

    FIELD_KEYS = ["created_at", "position", "location", "type", "filled"]

    class Meta:
        model = JobPosting
        fields = "__all__"

    def create(self, validated_data):
        responsibilities = validated_data.pop("responsibilities", [])
        requirements = validated_data.pop("requirements", [])

        posting = JobPosting.objects.create(**validated_data)

        for item_data in responsibilities:
            item, created = Responsibilities.objects.get_or_create(**item_data)
            posting.responsibilities.add(item)

        for item_data in requirements:
            item, created = Requirement.objects.get_or_create(**item_data)
            posting.requirements.add(item)

        return posting

    def update(self, instance, validated_data):
        print(validated_data)
        requirements_data = validated_data.pop("requirements", [])
        responsibilities_data = validated_data.pop("responsibilities", [])

        instance = super().update(instance, validated_data)

        for requirement_data in requirements_data:

            requirement, created = Requirement.objects.get_or_create(**requirement_data)
            instance.requirements.add(requirement)

        for responsibility_data in responsibilities_data:
            responsibility, created = Responsibilities.objects.get_or_create(
                **responsibility_data
            )
            instance.responsibilities.add(responsibility)

        return instance

    def format_data(self, data):
        formatted_data = {"requirements": [], "responsibilities": []}

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "requirements":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    feature_detail = value
                    formatted_data[name].append(feature_detail)

            elif name == "responsibilities":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    supported_site_detail = value
                    formatted_data[name].append(supported_site_detail)

            else:
                formatted_data[name] = value

        return formatted_data


class ApplicationSerializer(serializers.ModelSerializer):
    job = serializers.StringRelatedField(source="job.id")
    FIELD_KEYS = ["first_name", "last_name", "email", "status", "job"]

    class Meta:
        model = Application
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone",
            "email",
            "city",
            "zipcode",
            "job",
            "status",
            "resume",
            "created_at",
        ]


Application.serializer_class = ApplicationSerializer
Requirement.serializer_class = RequirementSerializer
Responsibilities.serializer_class = ResponsibilitiesSerializer
JobPosting.serializer_class = JobPostingSerializer
