from rest_framework import serializers
from .models import AboutBlock, MissionStatement, CompanyHistory, Value


class AboutBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutBlock
        fields = "__all__"

    def perform_update(self, serializer):
        previous_instance = self.get_object()
        previous_image = previous_instance.image
        super().perform_update(serializer)
        new_instance = self.get_object()
        new_image = new_instance.image
        if previous_image and previous_image != new_image:
            previous_image.storage.delete(previous_image.path)


class MissionStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionStatement
        fields = "__all__"


class CompanyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyHistory
        fields = "__all__"


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = "__all__"


class AboutFullSerializer(serializers.Serializer):
    about_block = AboutBlockSerializer()
    mission_statement = MissionStatementSerializer()
    company_history = CompanyHistorySerializer()
    core_values = ValueSerializer(many=True)
