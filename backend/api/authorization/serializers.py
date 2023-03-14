from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["username", "email"]

    class Meta:
        model = User
        fields = "__all__"


class ThemeSettingsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["user"]

    class Meta:
        model = ThemeSettings
        fields = "__all__"


User.serializer_class = UserSerializer
ThemeSettings.serializer_class = ThemeSettingsSerializer
