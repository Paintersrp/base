from rest_framework import serializers
from .models import *
from PIL import Image


class ContactInformationSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "phone",
        "address",
        "email",
    ]

    class Meta:
        model = ContactInformation
        fields = "__all__"


class HoursSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "monday",
        "friday",
        "saturday",
        "sunday",
    ]

    class Meta:
        model = Hours
        fields = "__all__"


class SocialsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "facebook",
        "linkedin",
        "instagram",
        "twitter",
        "youtube",
        "github",
    ]

    class Meta:
        model = Socials
        fields = "__all__"


class TeamMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    FIELD_KEYS = ["name", "role", "image"]

    class Meta:
        model = TeamMember
        fields = (
            "image",
            "id",
            "name",
            "role",
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


TeamMember.serializer_class = TeamMemberSerializer
Socials.serializer_class = SocialsSerializer
Hours.serializer_class = HoursSerializer
ContactInformation.serializer_class = ContactInformationSerializer
