from rest_framework import serializers
from PIL import Image
from .models import (
    AboutBlock,
    MissionStatement,
    CompanyHistory,
    Value,
    TeamMember,
    Skill,
    ContactInformation,
    FAQ,
    Category,
)


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


class ContactInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInformation
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class FAQSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source="category.name", read_only=True)

    class Meta:
        model = FAQ
        fields = ("id", "category", "question", "answer")

    def update(self, instance, validated_data):
        instance.question = validated_data.get("question", instance.question)
        instance.answer = validated_data.get("answer", instance.answer)
        category = validated_data.get("category")

        category, created = Category.objects.get_or_create(name=category)
        instance.category = category

        instance.save()

        return instance


class TeamMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = TeamMember
        fields = (
            "id",
            "name",
            "role",
            "image",
            "bio",
            "linkedIn",
            "github",
            "twitter",
        )

    def validate_image(self, image):
        if image is None:
            return image

        max_size = 1024 * 1024

        if image.size > max_size:
            raise serializers.ValidationError("Image file too large ( > 1mb )")

        try:
            Image.open(image).verify()

        except Exception:
            raise serializers.ValidationError("Invalid image format")

        return image


class AboutFullSerializer(serializers.Serializer):
    about_block = AboutBlockSerializer()
    mission_statement = MissionStatementSerializer()
    company_history = CompanyHistorySerializer()
    core_values = ValueSerializer(many=True)
    team_members = TeamMemberSerializer(many=True)
    contact_information = ContactInformationSerializer()
