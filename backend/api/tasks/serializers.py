from rest_framework import serializers
from .models import *
from authorization.serializers import UserSerializer


class TaskCategorySerializer(serializers.ModelSerializer):
    author = UserSerializer()
    FIELD_KEYS = ["name"]

    class Meta:
        model = TaskCategory
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    task_category = TaskCategorySerializer()
    completed_date = serializers.DateTimeField(read_only=True)
    FIELD_KEYS = ["title", "priority", "status", "task_category"]

    class Meta:
        model = Task
        fields = "__all__"


class TaskListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    author = UserSerializer()
    FIELD_KEYS = ["title", "created_date"]

    class Meta:
        model = TaskList
        fields = "__all__"


class TaskListBuilderSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["title", "created_date"]

    class Meta:
        model = TaskList
        fields = "__all__"


TaskCategory.serializer_class = TaskCategorySerializer
Task.serializer_class = TaskSerializer
TaskList.serializer_class = TaskListSerializer
