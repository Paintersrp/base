from rest_framework import serializers
from .models import *


class MessagesSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["created_at", "name", "email", "subject", "is_read", "is_archived"]

    class Meta:
        model = Messages
        fields = "__all__"


class SubscriberSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["email", "subscribed_on"]

    class Meta:
        model = Subscriber
        fields = "__all__"


Messages.serializer_class = MessagesSerializer
Subscriber.serializer_class = SubscriberSerializer
