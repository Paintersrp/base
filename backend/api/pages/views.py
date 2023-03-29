from django.shortcuts import render
from api.custom_views import *
from .models import *
from .serializers import *


class ReactComponentAPIView(BaseListView):
    queryset = ReactComponent.objects.all()
    serializer_class = ReactComponentSerializer
    model_class = ReactComponent


class ReactComponentDetailAPIView(BaseDetailView):
    queryset = ReactComponent.objects.all()
    serializer_class = ReactComponentSerializer
    model_class = ReactComponent


class ReactComponentBulkAPIView(BaseBulkView):
    queryset = ReactComponent.objects.all()
    serializer_class = ReactComponentSerializer
    model_class = ReactComponent


class ReactPageAPIView(BaseListView):
    queryset = ReactPage.objects.all()
    serializer_class = ReactPageSerializer
    model_class = ReactPage

    def create(self, request, *args, **kwargs):
        print(request.data)
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


class ReactPageDetailAPIView(BaseDetailView):
    queryset = ReactPage.objects.all()
    serializer_class = ReactPageSerializer
    model_class = ReactPage


class ReactPageBulkAPIView(BaseBulkView):
    queryset = ReactPage.objects.all()
    serializer_class = ReactPageSerializer
    model_class = ReactPage
