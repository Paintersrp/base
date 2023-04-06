from api.custom_views import *
from .models import *
from .serializers import *
from rest_framework import generics


class TextElementAPIView(BaseListView):
    queryset = TextElement.objects.all()
    serializer_class = TextElementSerializer
    model_class = TextElement


class TextElementDetailAPIView(BaseDetailView):
    queryset = TextElement.objects.all()
    serializer_class = TextElementSerializer
    model_class = TextElement


class TextElementBulkAPIView(BaseBulkView):
    queryset = TextElement.objects.all()
    serializer_class = TextElementSerializer
    model_class = TextElement


class ImageElementAPIView(BaseListView):
    queryset = ImageElement.objects.all()
    serializer_class = ImageElementSerializer
    model_class = ImageElement


class ImageElementDetailAPIView(BaseDetailView):
    queryset = ImageElement.objects.all()
    serializer_class = ImageElementSerializer
    model_class = ImageElement


class ImageElementBulkAPIView(BaseBulkView):
    queryset = ImageElement.objects.all()
    serializer_class = ImageElementSerializer
    model_class = ImageElement


class HeaderElementAPIView(BaseListView):
    queryset = HeaderElement.objects.all()
    serializer_class = HeaderElementSerializer
    model_class = HeaderElement


class HeaderElementDetailAPIView(BaseDetailView):
    queryset = HeaderElement.objects.all()
    serializer_class = HeaderElementSerializer
    model_class = HeaderElement


class HeaderElementBulkAPIView(BaseBulkView):
    queryset = HeaderElement.objects.all()
    serializer_class = HeaderElementSerializer
    model_class = HeaderElement


class ElementAPIView(BaseListView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    model_class = Element


class ElementDetailAPIView(BaseDetailView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    model_class = Element


class ElementBulkAPIView(BaseBulkView):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    model_class = Element


class ElementSetAPIView(BaseListView):
    queryset = ElementSet.objects.all()
    serializer_class = ElementSetSerializer
    model_class = ElementSet

    def create(self, request, *args, **kwargs):
        print(request.data)
        formatted_data = self.serializer_class().format_data(request.data)
        print(formatted_data)

        name = formatted_data.get("name")

        elements_list = formatted_data.get("elements", [])

        element_objs = []
        for feature in elements_list:
            element_obj, created = Element.objects.get_or_create(id=feature)
            element_objs.append(element_obj)

        element_set = ElementSet.objects.create(name=name)
        element_set.elements.set(element_objs)

        create_log_entry(
            LogEntry.Action.CREATE,
            request.username if request.username else None,
            element_set,
            None,
        )

        serializer = self.get_serializer(element_set)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ElementSetDetailAPIView(BaseDetailView):
    queryset = ElementSet.objects.all()
    serializer_class = ElementSetSerializer
    model_class = ElementSet


class ElementSetBulkAPIView(BaseBulkView):
    queryset = ElementSet.objects.all()
    serializer_class = ElementSetSerializer
    model_class = ElementSet


class ElementSetCategoryAPIView(BaseListView):
    queryset = ElementSetCategory.objects.all()
    serializer_class = ElementSetCategorySerializer
    model_class = ElementSetCategory


class ElementSetCategoryDetailAPIView(BaseDetailView):
    queryset = ElementSetCategory.objects.all()
    serializer_class = ElementSetCategorySerializer
    model_class = ElementSetCategory


class ElementSetCategoryBulkAPIView(BaseBulkView):
    queryset = ElementSetCategory.objects.all()
    serializer_class = ElementSetCategorySerializer
    model_class = ElementSetCategory
