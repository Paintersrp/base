from rest_framework import serializers
from .models import JobPosting, Requirement, Responsibilities


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

    FIELD_KEYS = ["tagline"]

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
        print(validated_datacd)
        requirements_data = validated_data.pop("requirements", [])
        responsibilities_data = validated_data.pop("responsibilities", [])

        instance = super().update(instance, validated_data)

        # Update requirements
        for requirement_data in requirements_data:
            requirement, created = Requirement.objects.get_or_create(**requirement_data)
            instance.requirements.add(requirement)

        # Update responsibilities
        for responsibility_data in responsibilities_data:
            responsibility, created = Responsibilities.objects.get_or_create(
                **responsibility_data
            )
            instance.responsibilities.add(responsibility)

        return instance


Requirement.serializer_class = RequirementSerializer
Responsibilities.serializer_class = ResponsibilitiesSerializer
JobPosting.serializer_class = JobPostingSerializer
