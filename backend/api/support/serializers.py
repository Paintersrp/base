from rest_framework import serializers
from .models import Messages


class MessagesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["created_at", "name", "email", "subject", "is_read", "is_archived"]

    class Meta:
        model = Messages
        fields = "__all__"


Messages.serializer_class = MessagesSerializer
