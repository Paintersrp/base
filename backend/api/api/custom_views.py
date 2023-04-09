from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from auditlog.models import LogEntry
from authorization.models import User
from api.utils import create_log_entry, return_changes
from django.db.models import ImageField
from django.contrib.contenttypes.models import ContentType
from django.db.models import ForeignKey, ManyToManyField
import re


#           opts = ListElement._meta.concrete_model._meta
#         info = model_meta.get_field_info(ListElement)
#         many_to_many = {}
#         for field_name, relation_info in info.relations.items():
#             if relation_info.to_many and (field_name in data):
#                 many_to_many[field_name] = data.pop(field_name)

#         fields = OrderedDict()
#         for field in [
#             field for field in opts.fields if field.serialize and not field.remote_field
#         ]:
#             fields[field.name] = field

#         print(opts.many_to_many)  # this is default to opts
#         print(opts.related_objects) # also default


class BaseListView(generics.ListCreateAPIView):
    serializer_class = None
    model_class = None
    foreign_key_fields = []
    mtm_fields = {}

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
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

        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        mtm_fields = {
            field.name: ""
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for field in model_fields:
            if isinstance(field, ForeignKey) and field.name == "tag":
                related_class = field.remote_field.model
                if "tag" in data and not data["tag"].isnumeric():
                    print("yeet")
                    tag = data.pop("tag", None)
                    tag_obj, created = related_class.objects.get_or_create(name=tag[0])
                    data["tag"] = tag_obj.id
            elif isinstance(field, ForeignKey):
                related_class = field.remote_field.model

                if field.name in data:
                    obj = data.pop(field.name, None)
                    foo_obj, created = related_class.objects.get_or_create(id=obj[0])
                    data[field.name] = foo_obj.id
            elif isinstance(field, ManyToManyField):
                mtm_fields[field.name] = field.remote_field.model

        mtm_values = {
            field.name: []
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = mtm_fields[name].objects.get_or_create(
                        id=value
                    )
                    mtm_values[name].append(element_obj)

        if any(field.name == "author" for field in model_fields):
            author = User.objects.get(username=request.username)
            data["author"] = author.id

        print(data)

        print(self.model_class.serializer_class)

        serializer = self.model_class.serializer_class(data=data)
        serializer.is_valid()
        print("valid", serializer.validated_data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        if mtm_values:
            for field in mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(mtm_values[field])

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

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.model_class.objects.all()


class BaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = None
    model_class = None
    mtm_fields = {}

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = self.model_class.objects.get(pk=instance.pk)

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

                data = request.data.copy()
        else:
            data = request.data.copy()

        model_fields = self.serializer_class.Meta.model._meta.get_fields()

        mtm_fields = {
            field.name: ""
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for field in model_fields:
            if isinstance(field, ForeignKey) and field.name == "tag":
                related_class = field.remote_field.model
                if "tag" in data and not data["tag"].isnumeric():
                    tag = data.pop("tag", None)
                    tag_obj, created = related_class.objects.get_or_create(name=tag[0])
                    data["tag"] = tag_obj.id
            elif isinstance(field, ForeignKey):
                related_class = field.remote_field.model
                if field.name in data:
                    obj = data.pop(field.name, None)
                    foo_obj, created = related_class.objects.get_or_create(id=obj[0])
                    data[field.name] = foo_obj.id

            elif isinstance(field, ManyToManyField):
                mtm_fields[field.name] = field.remote_field.model

        mtm_values = {
            field.name: []
            for field in model_fields
            if isinstance(field, ManyToManyField)
        }

        for key, value in data.items():
            parts = re.findall(r"\[(.*?)\]", key)
            name = key.split("[")[0]

            if name in mtm_fields:
                if len(parts) == 2 and parts[0].isdigit() and parts[1] == "id":
                    element_obj, created = mtm_fields[name].objects.get_or_create(
                        id=value
                    )
                    mtm_values[name].append(element_obj)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if mtm_values:
            for field in mtm_values:
                instance_field = getattr(instance, field)
                instance_field.set(mtm_values[field])

        changes = return_changes(instance, old_instance)

        create_log_entry(
            LogEntry.Action.UPDATE,
            request.username if request.username else None,
            instance,
            changes,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if hasattr(instance, "image") and instance.image is not None:
            instance.image.delete()

        self.perform_destroy(instance)
        create_log_entry(
            LogEntry.Action.DELETE,
            request.username if request.username else None,
            instance,
            None,
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return self.model_class.objects.all()


class BaseBulkView(generics.DestroyAPIView, generics.UpdateAPIView):
    serializer_class = None
    model_class = None

    def destroy(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=ids)

        for obj in queryset:
            if hasattr(obj, "image") and obj.image is not None:
                obj.image.delete()

        deleted = queryset.delete()

        if self.model_class.__name__ == "Messages":
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        if deleted[0] == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        field = request.data.get("field")
        value = request.data.get("value")

        if not field or value is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(id__in=ids)

        if field[0] == "is_archived":
            print({field[0]: value, "is_read": True})
            updated = queryset.update(**{field[0]: value, "is_read": True})

        if field[0] == "is_read" and value == True:
            updated = queryset.update(**{field[0]: value})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        elif field[0] == "is_read" and value == False:
            updated = queryset.update(**{field[0]: value, "is_archived": False})
            unread_queryset = self.filter_queryset(self.get_queryset())
            unread_queryset = unread_queryset.filter(is_read=False)
            count = unread_queryset.count()
            print(count)

            return Response({"count": count}, status=status.HTTP_200_OK)

        if updated == 0:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
