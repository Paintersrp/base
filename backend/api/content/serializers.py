from rest_framework import serializers
from .models import *


class ContentBlockSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "block_type",
        "content",
        "content_object",
        "content_type",
        "object_id",
    ]

    class Meta:
        model = ContentBlock
        fields = (
            "id",
            "block_type",
            "content",
            "order",
            "content_object",
            "content_type",
            "object_id",
        )


class HeadSerializer(ContentBlockSerializer):
    level = serializers.IntegerField()
    FIELD_KEYS = [
        "block_type",
        "content",
        "content_object",
        "level",
        "content_type",
        "object_id",
        "level",
    ]

    class Meta(ContentBlockSerializer.Meta):
        model = Head
        fields = ContentBlockSerializer.Meta.fields + ("level",)


class TextSerializer(ContentBlockSerializer):
    FIELD_KEYS = [
        "block_type",
        "content",
        "content_object",
        "level",
        "content_type",
        "object_id",
    ]

    class Meta(ContentBlockSerializer.Meta):
        model = Text
        fields = ContentBlockSerializer.Meta.fields


class ListSerializer(ContentBlockSerializer):
    style = serializers.CharField()
    FIELD_KEYS = ["block_type", "content", "content_object", "style"]

    class Meta(ContentBlockSerializer.Meta):
        model = List
        fields = ContentBlockSerializer.Meta.fields + ("style",)


class DictionarySerializer(ContentBlockSerializer):
    FIELD_KEYS = ["block_type", "content", "content_object"]

    class Meta(ContentBlockSerializer.Meta):
        model = Dictionary
        fields = ContentBlockSerializer.Meta.fields


class SectionSerializer(serializers.ModelSerializer):
    head_set = HeadSerializer(many=True)
    text_set = TextSerializer(many=True)
    list_set = ListSerializer(many=True)
    dictionary_set = DictionarySerializer(many=True)
    FIELD_KEYS = ["name", "slug"]

    class Meta:
        model = Section
        fields = (
            "id",
            "name",
            "slug",
            "head_set",
            "text_set",
            "list_set",
            "dictionary_set",
        )








Head.serializer_class = HeadSerializer
Text.serializer_class = TextSerializer
List.serializer_class = ListSerializer
Dictionary.serializer_class = DictionarySerializer
Section.serializer_class = SectionSerializer

