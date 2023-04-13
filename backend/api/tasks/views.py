from api.custom_views import *
from .models import *
from .serializers import *
from rest_framework import generics
from django.db.models import Q
from django.utils.text import slugify


class TaskCategoryAPIView(BaseListView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    model_class = TaskCategory


class TaskCategoryDetailAPIView(BaseDetailView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    model_class = TaskCategory


class TaskCategoryBulkAPIView(BaseBulkView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    model_class = TaskCategory


class TaskAPIView(BaseListView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    model_class = Task


class TaskDetailAPIView(BaseDetailView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    model_class = Task


class TaskBulkAPIView(BaseBulkView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    model_class = Task


class TaskListAPIView(BaseListView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList


class TaskListDetailAPIView(BaseDetailView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList


class TaskListBulkAPIView(BaseBulkView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList


class TaskListBuilder(generics.CreateAPIView):
    serializer_class = TaskListBuilderSerializer
    model_class = TaskList

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        tasks_data = data.pop("addedTasks")
        author = User.objects.get(username=request.username)
        data["author"] = author

        task_list = TaskList(**data)

        created_tasks = []
        for task_data in tasks_data:
            category = task_data.pop("category")

            category = TaskCategory.objects.create(author=author, name=category)
            task = Task.objects.create(
                author=author, **task_data, task_category=category
            )
            created_tasks.append(task)

        task_list.save()
        task_list.tasks.set(created_tasks)
        serializer = TaskListSerializer(task_list)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskListByTitle(generics.ListAPIView):
    serializer_class = TaskListSerializer

    def get_queryset(self):
        title_list = self.request.query_params.getlist("title", [])
        query = Q()

        for title in title_list:
            print(title)
            title = slugify(title).replace("-", " ")
            query |= Q(title__icontains=title)

        print(query)

        return TaskList.objects.filter(query)
