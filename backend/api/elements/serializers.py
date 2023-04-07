from rest_framework import serializers
from .models import *
from authorization.serializers import UserSerializer
import re


class ElementSetCategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ElementSetCategory
        fields = "__all__"


class ListItemTagSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ListItemTag
        fields = "__all__"


class ListElementItemSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name", "tag"]
    tag_details = ListItemTagSerializer(source="tag", read_only=True)

    class Meta:
        model = ListElementItem
        fields = "__all__"


class ListElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)
    items = ListElementItemSerializer(many=True, read_only=True)

    FIELD_KEYS = ["name", "author"]

    class Meta:
        model = ListElement
        fields = "__all__"


class TextElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)
    FIELD_KEYS = [
        "name",
        "type",
        "order",
        "author",
    ]

    class Meta:
        model = TextElement
        fields = [
            "name",
            "description",
            "order",
            "id",
            "type",
            "text",
            "created_at",
            "updated_at",
            "author",
            "author_details",
        ]


class ImageTagSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = ImageTag
        fields = "__all__"


class ImageElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)
    tag_details = ImageTagSerializer(source="tag", read_only=True)
    FIELD_KEYS = [
        "name",
        "image",
        "tag",
        "author",
        "type",
    ]

    class Meta:
        model = ImageElement
        fields = [
            "name",
            "description",
            "justify",
            "type",
            "id",
            "order",
            "image",
            "tag",
            "caption",
            "created_at",
            "updated_at",
            "author",
            "author_details",
            "tag_details",
        ]


class HeaderElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)
    FIELD_KEYS = [
        "name",
        "title",
        "order",
        "author",
    ]

    class Meta:
        model = HeaderElement
        fields = [
            "name",
            "description",
            "order",
            "type",
            "id",
            "title",
            "subtitle",
            "tagline",
            "bottom_divider",
            "top_divider",
            "alignment",
            "created_at",
            "updated_at",
            "author",
            "author_details",
        ]


class ElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)
    content_object = serializers.SerializerMethodField()
    FIELD_KEYS = [
        "name",
        "type",
        "subtype",
        "content_type",
        "object_id",
        "author",
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
            "subtype",
            "created_at",
            "updated_at",
            "author",
            "author_details",
        ]

    def get_content_object(self, obj):
        serializer = obj.content_object.__class__.serializer_class(
            obj.content_object,
            context={"request": self.context.get("request")},
        )

        return serializer.data


class ElementSetSerializer(serializers.ModelSerializer):
    elements = ElementSerializer(many=True, read_only=True)
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


class CardElementSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source="author", read_only=True)

    FIELD_KEYS = ["name", "author"]

    class Meta:
        model = CardElement
        fields = "__all__"


ElementSetCategory.serializer_class = ElementSetCategorySerializer
Element.serializer_class = ElementSerializer
TextElement.serializer_class = TextElementSerializer
HeaderElement.serializer_class = HeaderElementSerializer
ImageElement.serializer_class = ImageElementSerializer
ImageTag.serializer_class = ImageTagSerializer
ElementSet.serializer_class = ElementSetSerializer
ListElement.serializer_class = ListElementSerializer
ListElementItem.serializer_class = ListElementItemSerializer
ListItemTag.serializer_class = ListItemTagSerializer
CardElement.serializer_class = CardElementSerializer
