from rest_framework import serializers
from .models import Articles, Tags
from authorization.models import User
from PIL import Image


class TagsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = Tags
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    tags = TagsSerializer(many=True)
    image = serializers.ImageField(required=False, allow_null=True)
    FIELD_KEYS = ["created_at", "updated_at", "title", "author", "image"]

    class Meta:
        model = Articles
        fields = [
            "id",
            "title",
            "content",
            "author",
            "created_at",
            "updated_at",
            "tags",
            "image",
            "is_highlighted",
        ]

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

    def create(self, validated_data, username):
        author = User.objects.get(username=username)
        validated_data["author"] = author
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
                tag_name = tag_dict.get("name")
                tag, created = Tags.objects.get_or_create(name=tag_name)
                tag_objs.append(tag)

            instance.tags.set(tag_objs)

        instance.save()

        return instance


Articles.serializer_class = ArticleSerializer
Tags.serializer_class = TagsSerializer
