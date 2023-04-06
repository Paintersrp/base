from rest_framework import serializers
from .models import *

import re


class ElementSetCategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ElementSetCategory
        fields = "__all__"


class TextElementSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "text",
        "order",
    ]

    class Meta:
        model = TextElement
        fields = [
            "name",
            "description",
            "order",
            "id",
            "text",
            "created_at",
            "updated_at",
        ]


class ImageElementSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "image",
        "order",
    ]

    class Meta:
        model = ImageElement
        fields = [
            "name",
            "description",
            "id",
            "order",
            "image",
            "created_at",
            "updated_at",
        ]


class HeaderElementSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "name",
        "title",
        "order",
    ]

    class Meta:
        model = HeaderElement
        fields = [
            "name",
            "description",
            "order",
            "id",
            "title",
            "subtitle",
            "tagline",
            "bottom_divider",
            "top_divider",
            "alignment",
            "created_at",
            "updated_at",
        ]


class ElementSerializer(serializers.ModelSerializer):
    content_object = serializers.SerializerMethodField()
    FIELD_KEYS = [
        "name",
        "type",
        "content_type",
        "object_id",
    ]

    class Meta:
        model = Element
        fields = [
            "id",
            "name",
            "description",
            "content_type",
            "object_id",
            "content_object",
            "type",
            "created_at",
            "updated_at",
        ]

    def get_content_object(self, obj):
        if obj.content_type.model == "textelement":
            serializer = TextElementSerializer(
                obj.content_object,
                context={"request": self.context.get("request")},
            )
        elif obj.content_type.model == "imageelement":
            serializer = ImageElementSerializer(
                obj.content_object,
                context={"request": self.context.get("request")},
            )
        elif obj.content_type.model == "headerelement":
            serializer = HeaderElementSerializer(
                obj.content_object,
                context={"request": self.context.get("request")},
            )
        else:
            raise Exception("Unexpected content type")

        return serializer.data


class ElementSetSerializer(serializers.ModelSerializer):
    elements = ElementSerializer(many=True)
    FIELD_KEYS = ["name"]

    class Meta:
        model = ElementSet
        fields = [
            "id",
            "name",
            "description",
            "elements",
            "created_at",
            "updated_at",
        ]

    def format_data(self, data):
        formatted_data = {"elements": []}

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "elements":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    feature_detail = value
                    formatted_data[name].append(feature_detail)
            else:
                formatted_data[name] = value

        return formatted_data


ElementSetCategory.serializer_class = ElementSetCategorySerializer
Element.serializer_class = ElementSerializer
TextElement.serializer_class = TextElementSerializer
HeaderElement.serializer_class = HeaderElementSerializer
ImageElement.serializer_class = ImageElementSerializer
ElementSet.serializer_class = ElementSetSerializer
