from rest_framework import serializers
from .models import *
from contact.models import *
from contact.serializers import *


class AboutBlockSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    FIELD_KEYS = [
        "name",
        "title",
        "image",
    ]

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
    FIELD_KEYS = [
        "name",
        "title",
    ]

    class Meta:
        model = MissionStatement
        fields = "__all__"


class CompanyHistorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
    ]

    class Meta:
        model = CompanyHistory
        fields = "__all__"


class ValueSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "title",
        "icon",
    ]

    class Meta:
        model = Value
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = Category
        fields = "__all__"


class FAQSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source="category.name")
    FIELD_KEYS = [
        "name",
        "question",
        "answer",
        "category",
    ]

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
        print(validated_data)
        instance.question = validated_data.get("question", instance.question)
        instance.answer = validated_data.get("answer", instance.answer)
        instance.name = validated_data.get("name", instance.name)
        category = validated_data.get("category")

        category, created = Category.objects.get_or_create(name=category)
        instance.category = category

        instance.save()

        return instance


AboutBlock.serializer_class = AboutBlockSerializer
CompanyHistory.serializer_class = CompanyHistorySerializer
MissionStatement.serializer_class = MissionStatementSerializer
TeamMember.serializer_class = TeamMemberSerializer
FAQ.serializer_class = FAQSerializer
Value.serializer_class = ValueSerializer
Category.serializer_class = CategorySerializer
