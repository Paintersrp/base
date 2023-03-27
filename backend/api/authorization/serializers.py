from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["username", "email"]

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "address",
            "city",
            "state",
            "zip_code",
            "country",
            "is_staff",
        ]


class TokenBlacklistSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["token"]

    class Meta:
        model = TokenBlacklist
        fields = "__all__"


class ThemeSettingsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(source="user.username")
    FIELD_KEYS = ["user", "primary_color", "secondary_color", "background_color"]

    class Meta:
        model = ThemeSettings
        fields = "__all__"


User.serializer_class = UserSerializer
TokenBlacklist.serializer_class = TokenBlacklistSerializer
ThemeSettings.serializer_class = ThemeSettingsSerializer
