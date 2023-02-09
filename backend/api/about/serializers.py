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
    category_name = serializers.StringRelatedField(source='category.name', read_only=True)

    class Meta:
        model = FAQ
        fields = ("id", "question", "answer", "category_name")


class TeamMemberSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
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
            "skills",
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

    def create(self, validated_data):
        skills_data = validated_data.pop("skills", [])
        team_member = TeamMember.objects.create(**validated_data)

        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            team_member.tags.add(skill)

        return team_member

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.image = validated_data.get("image", instance.image)
        skills = validated_data.get("skills")

        if skills:
            skill_objs = []

            for skill_dict in skills:
                skill_name = skill_dict.get("name")
                skill, created = Skill.objects.get_or_create(name=skill_name)
                skill_objs.append(skill)

            instance.tags.set(skill_objs)

        instance.save()

        return instance


class AboutFullSerializer(serializers.Serializer):
    about_block = AboutBlockSerializer()
    mission_statement = MissionStatementSerializer()
    company_history = CompanyHistorySerializer()
    core_values = ValueSerializer(many=True)
    team_members = TeamMemberSerializer(many=True)
    contact_information = ContactInformationSerializer()
