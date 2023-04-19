from rest_framework import serializers
from .models import *
from authorization.serializers import UserSerializer


class TaskFullSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    completed_date = serializers.DateTimeField(read_only=True)
    FIELD_KEYS = ["title", "priority", "status"]

    class Meta:
        model = Task
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    completed_date = serializers.DateTimeField(read_only=True)
    FIELD_KEYS = ["title", "priority", "status"]

    class Meta:
        model = Task
        fields = "__all__"


class TaskSectionFullSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    author = UserSerializer()
    FIELD_KEYS = ["title", "created_at"]

    class Meta:
        model = TaskSection
        fields = "__all__"


class TaskSectionSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    FIELD_KEYS = ["title", "created_at"]

    class Meta:
        model = TaskSection
        fields = "__all__"


class TaskListFullSerializer(serializers.ModelSerializer):
    sections = TaskSectionSerializer(many=True, read_only=True)
    author = UserSerializer()
    FIELD_KEYS = ["title", "created_at"]

    class Meta:
        model = TaskList
        fields = "__all__"


class TaskListSerializer(serializers.ModelSerializer):
    sections = TaskSectionSerializer(many=True, read_only=True)
    FIELD_KEYS = ["title", "created_at"]

    class Meta:
        model = TaskList
        fields = "__all__"


class TaskList2BuilderSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "created_at"]

    class Meta:
        model = TaskList
        fields = "__all__"


Task.serializer_class = TaskFullSerializer
TaskSection.serializer_class = TaskSectionFullSerializer
TaskList.serializer_class = TaskListFullSerializer
