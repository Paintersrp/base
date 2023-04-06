from api.custom_views import *
from .models import *
from .serializers import *


class PageSetAPIView(BaseListView):
    queryset = PageSet.objects.all()
    serializer_class = PageSetSerializer
    model_class = PageSet

    def create(self, request, *args, **kwargs):
        page_ids = set()

        for key, value in request.data.items():
            if key.startswith("pages["):
                page_id = key.split("[")[2].split("]")[0]
                if page_id == "id":
                    page_ids.add(value)

        pages = PageObj.objects.filter(id__in=page_ids)

        print(request.data.get("set_name"))

        data = {
            "set_name": request.data.get("set_name"),
        }

        page_set_serializer = self.get_serializer(data=data, partial=True)
        if page_set_serializer.is_valid():
            print("yes")
            page_set = page_set_serializer.save()

            for page_obj in pages:
                page_set.pages.add(page_obj)

            return Response(page_set_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(page_set_serializer.errors)
            return Response(
                page_set_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class PageSetDetailAPIView(BaseDetailView):
    queryset = PageSet.objects.all()
    serializer_class = PageSetSerializer
    model_class = PageSet

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = PageSet.objects.get(pk=instance.pk)

        page_ids = set()

        for key, value in request.data.items():
            if key.startswith("pages["):
                page_id = key.split("[")[2].split("]")[0]
                if page_id == "id":
                    page_ids.add(value)

        pages = PageObj.objects.filter(id__in=page_ids)

        instance.pages.set(pages)
        instance.save()

        data = {
            "set_name": request.data.get("set_name"),
        }

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        print(changes)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)


class PageSetBulkAPIView(BaseBulkView):
    queryset = PageSet.objects.all()
    serializer_class = PageSetSerializer
    model_class = PageSet


class ComponentCategoryAPIView(BaseListView):
    queryset = ComponentCategory.objects.all()
    serializer_class = ComponentCategorySerializer
    model_class = ComponentCategory


class ComponentCategoryDetailAPIView(BaseDetailView):
    queryset = ComponentCategory.objects.all()
    serializer_class = ComponentCategorySerializer
    model_class = ComponentCategory


class ComponentCategoryBulkAPIView(BaseBulkView):
    queryset = ComponentCategory.objects.all()
    serializer_class = ComponentCategorySerializer
    model_class = ComponentCategory


class ComponentObjMinAPIView(BaseListView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjMinSerializer
    model_class = ComponentObj


class ComponentObjAPIView(BaseListView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        query_params = {}
        for key, value in data.items():
            if key.startswith("query_params"):
                _, index, operator = key.split("[")
                index = str(index.strip("]"))
                operator = operator.strip("]")
                if index not in query_params:
                    query_params[index] = {}
                query_params[index][operator] = value

        if "category" in data:
            if not data["category"].isnumeric():
                category = data.pop("category", None)
                category_obj, created = ComponentCategory.objects.get_or_create(
                    name=category[0]
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        if not "category" in data:
            instance.category = category_obj

        author = User.objects.get(username=request.username)
        instance.author = author
        instance.query_params = query_params
        instance.save()

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class ComponentObjDetailAPIView(BaseDetailView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = ComponentObj.objects.get(pk=instance.pk)
        data = request.data.copy()

        query_params = {}
        for key, value in data.items():
            if key.startswith("query_params"):
                _, index, operator = key.split("[")
                index = str(index.strip("]"))
                operator = operator.strip("]")
                if index not in query_params:
                    query_params[index] = {}
                query_params[index][operator] = value

        if "category" in data:
            print("yes", "category")
            if not data["category"].isnumeric():
                category = data.pop("category", None)
                category_obj, created = ComponentCategory.objects.get_or_create(
                    name=category[0]
                )
                instance.category = category_obj

        instance.query_params = query_params
        instance.save()

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        print(changes)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)


class ComponentObjBulkAPIView(BaseBulkView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj


class PageObjAPIView(BaseListView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj

    def create(self, request, *args, **kwargs):
        data = self.serializer_class().format_data(request.data, create=True)

        for field in self.foreign_key_fields:
            if field in data:
                related_class = self.serializer_class.Meta.model._meta.get_field(
                    field
                ).remote_field.model

                try:
                    related_obj = related_class.objects.get(id=data[field])
                    print(related_obj.id)
                except related_class.DoesNotExist:
                    raise NotFound(
                        detail=f"{related_class.__name__} with id {data[field]} does not exist"
                    )

                data[f"{field}"] = related_obj.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        author = User.objects.get(username=request.username)
        instance.author = author
        instance.save()

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            instance,
            None,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PageObjDetailAPIView(BaseDetailView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        data = self.serializer_class().format_data(request.data, create=True)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)

        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)


class PageObjBulkAPIView(BaseBulkView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj


class PageObjLookupAPIView(BaseDetailView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj
    lookup_field = "page_name"


class AppAPIView(BaseListView):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    model_class = App


class AppDetailAPIView(BaseDetailView):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    model_class = App


class AppBulkAPIView(BaseBulkView):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    model_class = App


class AppLookupAPIView(BaseDetailView):
    queryset = App.objects.all()
    serializer_class = AppSerializer
    model_class = App
    lookup_field = "app_name"
