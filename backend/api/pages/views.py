from django.shortcuts import render
from api.custom_views import *
from .models import *
from .serializers import *


class PageLookupAPIView(BaseDetailView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page
    lookup_field = "page_name"


class PageNameAPIView(BaseListView):
    queryset = Page.objects.all()
    serializer_class = PageNameSerializer
    model_class = Page


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


class ComponentObjAPIView(BaseListView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj


class ComponentObjDetailAPIView(BaseDetailView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj


class ComponentObjBulkAPIView(BaseBulkView):
    queryset = ComponentObj.objects.all()
    serializer_class = ComponentObjSerializer
    model_class = ComponentObj


class PageAPIView(BaseListView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    model_class = Page

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


class PageObjBulkAPIView(BaseBulkView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj


class PageObjLookupAPIView(BaseDetailView):
    queryset = PageObj.objects.all()
    serializer_class = PageObjSerializer
    model_class = PageObj
    lookup_field = "page_name"
