from rest_framework import serializers
from .models import Articles, Tags
from authorization.models import User
from authorization.serializers import UserSerializer
from PIL import Image
import re


class TagsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["detail"]

    class Meta:
        model = Tags
        fields = "__all__"


class RelatedArticleSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    author_details = UserSerializer(source="author", read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Articles
        fields = [
            "id",
            "title",
            "content",
            "author",
            "author_details",
            "created_at",
            "image",
            "tags",
        ]


class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    author_details = UserSerializer(source="author", read_only=True)
    tags = TagsSerializer(many=True)
    image = serializers.ImageField(required=False, allow_null=True)
    related_articles = serializers.SerializerMethodField()
    tags_options = serializers.SerializerMethodField()
    FIELD_KEYS = ["created_at", "updated_at", "title", "author", "image"]

    class Meta:
        model = Articles
        fields = [
            "id",
            "title",
            "content",
            "author",
            "author_details",
            "created_at",
            "updated_at",
            "tags",
            "image",
            "is_highlighted",
            "related_articles",
            "tags_options",
        ]

    def get_related_articles(self, obj):
        related_articles = Articles.objects.filter(tags__in=obj.tags.all()).exclude(
            id=obj.id
        )
        return RelatedArticleSerializer(
            related_articles, many=True, context={"request": self.context["request"]}
        ).data

    def get_tags_options(self, obj):
        return list(Tags.objects.values_list("detail", flat=True))

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["author_details"] = UserSerializer(instance.author).data
        return representation

    def format_data(self, data):
        formatted_data = {
            "tags": [],
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name == "tags":
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "detail":
                    feature_detail = value
                    formatted_data[name].append(feature_detail)
            else:
                formatted_data[name] = value

        return formatted_data

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        article = Articles.objects.create(**validated_data)

        for tag_data in tags_data:
            tag, created = Tags.objects.get_or_create(**tag_data)
            article.tags.add(tag)

        return article

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.image = validated_data.get("image", instance.image)
        instance.author = User.objects.get(username=instance.author)
        tags = validated_data.get("tags")

        if tags:
            tag_objs = []

            for tag_dict in tags:
                tag_name = tag_dict.get("detail")
                tag, created = Tags.objects.get_or_create(detail=tag_name)
                tag_objs.append(tag)

            instance.tags.set(tag_objs)

        instance.save()

        return instance

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


Articles.serializer_class = ArticleSerializer
Tags.serializer_class = TagsSerializer
