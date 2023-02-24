from rest_framework import serializers
from .models import Messages


class MessagesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name", "email", "subject", "is_read", "is_archived", "created_at"]

    class Meta:
        model = Messages
        fields = "__all__"


Messages.serializer_class = MessagesSerializer
