from api.custom_views import *
from .models import *
from .serializers import *
from rest_framework import generics
from django.db.models import Q
from django.utils.text import slugify
from django.db.models.functions import Lower


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


class TaskSectionAPIView(BaseListView):
    queryset = TaskSection.objects.all()
    serializer_class = TaskSectionSerializer
    model_class = TaskSection


class TaskSectionDetailAPIView(BaseDetailView):
    queryset = TaskSection.objects.all()
    serializer_class = TaskSectionSerializer
    model_class = TaskSection


class TaskSectionBulkAPIView(BaseBulkView):
    queryset = TaskSection.objects.all()
    serializer_class = TaskSectionSerializer
    model_class = TaskSection


class TaskListAPIView(BaseListView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList


class TaskListDetailAPIView(BaseDetailView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        sections = data.pop("sections")
        author = User.objects.get(username=request.username)

        created_sections = []
        for section in sections:
            tasks = section.pop("tasks")
            section, _ = TaskSection.objects.get_or_create(author=author, **section)
            print(section, section.order)

            task_objs = []
            for task in tasks:
                if task["id"]:
                    task_obj = Task.objects.get(id=task["id"])
                    for key, value in task.items():
                        if key != "id":
                            setattr(task_obj, key, value)

                    task_obj.save()
                else:
                    task.pop("section")
                    task.pop("id")
                    task_obj = Task.objects.create(author=author, **task)

                task_objs.append(task_obj)

            section.tasks.set(task_objs)
            created_sections.append(section)

        instance.sections.set(created_sections)
        # instance.title = data["title"]
        instance.description = data["description"]
        instance.save()
        serializer = TaskListSerializer(instance)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskListBulkAPIView(BaseBulkView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    model_class = TaskList


# class TaskListBuilder(generics.CreateAPIView):
#     serializer_class = TaskList2BuilderSerializer
#     model_class = TaskList

#     def post(self, request, *args, **kwargs):
#         data = request.data.copy()
#         sections = data.pop("sections")
#         author = User.objects.get(username=request.username)

#         data["author"] = author

#         task_list = TaskList(**data)
#         created_sections = []
#         for section in sections:
#             tasks = section.pop("tasks")
#             section = TaskSection.objects.create(author=author, **section)

#             for task in tasks:
#                 task.pop("section")
#                 task_obj = Task.objects.create(author=author, **task)
#                 section.tasks.add(task_obj)

#             created_sections.append(section)
#             print(section)

#         task_list.save()
#         task_list.sections.set(created_sections)
#         serializer = TaskListSerializer(task_list)


#         return Response(serializer.data, status=status.HTTP_201_CREATED)
class TaskListBuilder(generics.CreateAPIView):
    serializer_class = TaskList2BuilderSerializer
    model_class = TaskList

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        author = User.objects.get(username=request.username)
        data["author"] = author

        task_list = TaskList.objects.create(**data)
        serializer = TaskListSerializer(task_list)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskListByTitle(generics.ListAPIView):
    serializer_class = TaskListSerializer

    def get_queryset(self):
        title_list = self.request.query_params.getlist("title", [])
        query = Q()

        for title in title_list:
            title_slug = slugify(title).replace("-", " ")
            query |= Q(title__icontains=title_slug)

        existing_task_lists = TaskList.objects.filter(query)
        existing_titles = set(
            existing_task_lists.values_list("title", flat=True)
            .annotate(lower_title=Lower("title"))
            .values_list("lower_title", flat=True)
        )

        new_task_lists = [
            TaskList(title=slugify(title).replace("-", " "))
            for title in title_list
            if slugify(title).replace("-", " ").lower()
            not in [t.lower() for t in existing_titles]
        ]
        TaskList.objects.bulk_create(new_task_lists)

        return TaskList.objects.filter(query)
