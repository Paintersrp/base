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
    requirements = RequirementSerializer(many=True)
    responsibilities = ResponsibilitiesSerializer(many=True)

    FIELD_KEYS = ["tagline"]

    class Meta:
        model = JobPosting
        fields = "__all__"

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     keys = self.validated_data.get("keys", [])
    #     if keys:
    #         keys = [
    #             key for key in keys if key in self.fields and key in self.FIELD_KEYS
    #         ]
    #         representation = {
    #             key: value for key, value in representation.items() if key in keys
    #         }

    #     return representation

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


Requirement.serializer_class = RequirementSerializer
Responsibilities.serializer_class = ResponsibilitiesSerializer
JobPosting.serializer_class = JobPostingSerializer
