from api.custom_views import *
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser

from django.shortcuts import render
from django.http import HttpResponse
from .models import TextElement

from django.contrib.contenttypes.models import ContentType


def delete_list_elements_with_no_content_object(request):
    # Get the ContentType object for ListElement
    list_element_ct = ContentType.objects.get_for_model(ListElement)

    # Get a queryset of ListElement objects with no related content_object
    list_elements = Element.objects.filter(content_type=list_element_ct)

    # Loop over the queryset and delete ListElements with no content_object
    for list_element in list_elements:
        if list_element.content_object:
            print("Not None")
        else:
            print("None", list_element.content_object)
            list_element.delete()

    # Return a response to indicate that the delete was successful
    return HttpResponse("ListElements with no content_object deleted successfully.")


def update_list_elements(request):
    list_elements = ListElement.objects.all()

    i = 0
    for list_element in list_elements:
        if i % 4 == 0:
            list_element.type = "Standard"
        elif i % 4 == 1:
            list_element.type = "Icon"
        elif i % 4 == 2:
            list_element.type = "Image"
        elif i % 4 == 3:
            list_element.type = "Avatar"

        list_element.save()
        i += 1

    return HttpResponse("ListElements updated successfully.")


class CardElementAPIView(BaseListView):
    queryset = CardElement.objects.all()
    serializer_class = CardElementSerializer
    model_class = CardElement


class CardElementDetailAPIView(BaseDetailView):
    queryset = CardElement.objects.all()
    serializer_class = CardElementSerializer
    model_class = CardElement


class CardElementBulkAPIView(BaseBulkView):
    queryset = CardElement.objects.all()
    serializer_class = CardElementSerializer
    model_class = CardElement


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


class ListItemTagAPIView(BaseListView):
    queryset = ListItemTag.objects.all()
    serializer_class = ListItemTagSerializer
    model_class = ListItemTag


class ListItemTagDetailAPIView(BaseDetailView):
    queryset = ListItemTag.objects.all()
    serializer_class = ListItemTagSerializer
    model_class = ListItemTag


class ListItemTagBulkAPIView(BaseBulkView):
    queryset = ListItemTag.objects.all()
    serializer_class = ListItemTagSerializer
    model_class = ListItemTag


class ListElementItemAPIView(BaseListView):
    queryset = ListElementItem.objects.all()
    serializer_class = ListElementItemSerializer
    model_class = ListElementItem


class ListElementItemDetailAPIView(BaseDetailView):
    queryset = ListElementItem.objects.all()
    serializer_class = ListElementItemSerializer
    model_class = ListElementItem


class ListElementItemBulkAPIView(BaseBulkView):
    queryset = ListElementItem.objects.all()
    serializer_class = ListElementItemSerializer
    model_class = ListElementItem


class ListElementAPIView(BaseListView):
    queryset = ListElement.objects.all()
    serializer_class = ListElementSerializer
    model_class = ListElement


class ListElementDetailAPIView(BaseDetailView):
    queryset = ListElement.objects.all()
    serializer_class = ListElementSerializer
    model_class = ListElement


class ListElementBulkAPIView(BaseBulkView):
    queryset = ListElement.objects.all()
    serializer_class = ListElementSerializer
    model_class = ListElement


class ListBuilder(generics.CreateAPIView):
    serializer_class = ListElementSerializer
    model_class = ListElement
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        items_data = {}
        list_data = {}
        for key, value in request.data.items():
            if key == "name":
                list_data["name"] = value
            elif key == "type":
                list_data["type"] = value
            elif key.startswith("listItems"):
                key_parts = key.split("[")
                item_index = int(key_parts[1][:-1])
                item_key = key_parts[2][:-1]
                if item_index not in items_data:
                    items_data[item_index] = {}
                if item_key == "image":
                    items_data[item_index][item_key] = request.FILES.get(key)
                else:
                    items_data[item_index][item_key] = value

        author = User.objects.get(username=request.username)

        created_list = ListElement(**list_data, author=author)

        items_list = list(items_data.values())
        created_items = []
        for item_data in items_list:
            tag = item_data.pop("tag")
            tag_obj, created = ListItemTag.objects.get_or_create(
                author=author, name=tag
            )
            item_data["tag"] = tag_obj

            created_item = ListElementItem.objects.create(**item_data, author=author)
            created_items.append(created_item)

        created_list.save()
        created_list.items.set(created_items)
        serializer = self.get_serializer(created_list)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ImageTagAPIView(BaseListView):
    queryset = ImageTag.objects.all()
    serializer_class = ImageTagSerializer
    model_class = ImageTag


class ImageTagDetailAPIView(BaseDetailView):
    queryset = ImageTag.objects.all()
    serializer_class = ImageTagSerializer
    model_class = ImageTag


class ImageTagBulkAPIView(BaseBulkView):
    queryset = ImageTag.objects.all()
    serializer_class = ImageTagSerializer
    model_class = ImageTag


class ImageElementAPIView(BaseListView):
    queryset = ImageElement.objects.all()
    serializer_class = ImageElementSerializer
    model_class = ImageElement

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        author = User.objects.get(username=request.username)
        data["author"] = author.id

        if "tag" in data:
            if not data["tag"].isnumeric():
                tag = data.pop("tag", None)
                tag_obj, created = ImageTag.objects.get_or_create(
                    name=tag[0], author=author
                )
                data["tag"] = tag_obj.id

        serializer = self.get_serializer(data=data)
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


class ImageElementDetailAPIView(BaseDetailView):
    queryset = ImageElement.objects.all()
    serializer_class = ImageElementSerializer
    model_class = ImageElement

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)
        author = User.objects.get(username=request.username)

        image_field_name = None
        for field in instance._meta.fields:
            if isinstance(field, ImageField):
                image_field_name = field.name

        if image_field_name is not None:
            image = request.FILES.get(image_field_name)

            if image is None or image == getattr(instance, image_field_name):
                data = request.data.copy()
                data[image_field_name] = getattr(instance, image_field_name)
            else:
                getattr(instance, image_field_name).delete()

                data = request.data
        else:
            data = request.data

        if "tag" in data:
            if not data["tag"].isnumeric():
                tag = data.pop("tag", None)
                tag_obj, created = ImageTag.objects.get_or_create(
                    name=tag[0], author=author
                )
                data["tag"] = tag_obj.id

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
        formatted_data = self.serializer_class().format_data(request.data)

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
