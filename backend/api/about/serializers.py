from rest_framework import serializers
from PIL import Image
from .models import *
from jobs.serializers import JobPostingSerializer
from api.views import get_model_metadata


class AboutBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "image"]

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
    FIELD_KEYS = ["title"]

    class Meta:
        model = MissionStatement
        fields = "__all__"


class CompanyHistorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title"]

    class Meta:
        model = CompanyHistory
        fields = "__all__"


class ValueSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "icon"]

    class Meta:
        model = Value
        fields = "__all__"


class ContactInformationSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "phone",
        "address",
        "email",
    ]

    class Meta:
        model = ContactInformation
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name")


class CategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = Category
        fields = "__all__"


class FAQSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source="category.name")
    FIELD_KEYS = ["question", "answer", "category"]

    class Meta:
        model = FAQ
        fields = "__all__"

    def create(self, validated_data):
        category_data = validated_data.pop("category", None)

        if category_data:
            if isinstance(category_data, str):
                category_data = {"name": category_data}
            category, created = Category.objects.get_or_create(**category_data)
        else:
            category = None
        faq = FAQ.objects.create(category=category, **validated_data)

        return faq

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
    FIELD_KEYS = ["name", "role", "image"]

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
            "facebook",
            "instagram",
            "youtube",
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
    jobs = JobPostingSerializer(many=True)
    metadata = serializers.SerializerMethodField()

    def get_metadata(self, obj):
        metadata = []
        for model in [
            "AboutBlock",
            "MissionStatement",
            "CompanyHistory",
            "Value",
            "TeamMember",
            "ContactInformation",
            "JobPosting",
        ]:
            metadata.append(get_model_metadata(model))
        return metadata


AboutBlock.serializer_class = AboutBlockSerializer
CompanyHistory.serializer_class = CompanyHistorySerializer
MissionStatement.serializer_class = MissionStatementSerializer
ContactInformation.serializer_class = ContactInformationSerializer
TeamMember.serializer_class = TeamMemberSerializer
FAQ.serializer_class = FAQSerializer
Value.serializer_class = ValueSerializer
Category.serializer_class = CategorySerializer
