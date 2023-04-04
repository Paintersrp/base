from django.shortcuts import render
from api.custom_views import *
from .models import *
from .serializers import *
from django.http import QueryDict


class PageLookupAPIView(BaseDetailView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page
    lookup_field = "page_name"


class PageNameAPIView(BaseListView):
    queryset = Page.objects.all()
    serializer_class = PageNameSerializer
    model_class = Page


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


class ComponentAPIView(BaseListView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    model_class = Component


class ComponentDetailAPIView(BaseDetailView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    model_class = Component


class ComponentBulkAPIView(BaseBulkView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    model_class = Component


class ComponentObjMinAPIView(BaseListView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjMinSerializer
    model_class = ComponentObj


class ComponentObjAPIView(BaseListView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj

    def create(self, request, *args, **kwargs):
        print(request.data)
        query_params = {}
        for key, value in request.data.items():
            if key.startswith("query_params"):
                _, index, operator = key.split("[")
                index = str(index.strip("]"))
                operator = operator.strip("]")
                if index not in query_params:
                    query_params[index] = {}
                query_params[index][operator] = value

        # instance = ComponentObj.objects.create(query_params=query_params)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
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

        query_params = {}
        for key, value in request.data.items():
            if key.startswith("query_params"):
                _, index, operator = key.split("[")
                index = str(index.strip("]"))
                operator = operator.strip("]")
                if index not in query_params:
                    query_params[index] = {}
                query_params[index][operator] = value

        print("query_params", query_params)
        instance.query_params = query_params
        instance.save()

        print(request.data)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        print(serializer.data)

        changes = return_changes(instance, old_instance)
        print(changes)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)


class ComponentObjBulkAPIView(BaseBulkView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj


class PageAPIView(BaseListView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page

    def create(self, request, *args, **kwargs):
        print(request.data)
        data = self.serializer_class().format_data(request.data, create=True)
        print(data)

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
        serializer.is_valid()
        print(serializer.errors)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

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


class PageDetailAPIView(BaseDetailView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page


class PageBulkAPIView(BaseBulkView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page


class PageObjAPIView(BaseListView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj

    def create(self, request, *args, **kwargs):
        print(request.data)
        data = self.serializer_class().format_data(request.data, create=True)
        print("formatted", data)

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
        serializer.is_valid()
        print(serializer.errors)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

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
        print(data)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        print(changes)

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
