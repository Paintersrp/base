from rest_framework import serializers
from .models import JobPosting, Requirement, Responsibilities


class ResponsibilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibilities
        fields = "__all__"


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = "__all__"


class JobPostingSerializer(serializers.ModelSerializer):
    requirements = RequirementSerializer(many=True)
    responsibilities = ResponsibilitiesSerializer(many=True)

    class Meta:
        model = JobPosting
        fields = "__all__"
