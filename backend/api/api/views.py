from django.contrib import admin
from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import generics, serializers, status
from django.apps import apps
from django.db.models import Model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from authorization.models import User
from authorization.serializers import UserSerializer
from django.urls import reverse, NoReverseMatch
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.contrib.contenttypes.models import ContentType
from auditlog.models import LogEntry
import json


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def custom_admin_url_return(request, content_type_id, object_id):
    content_type = get_object_or_404(ContentType, pk=content_type_id)
    model = content_type.model_class()
    obj = get_object_or_404(model, pk=object_id)
    return render(request, "my_template.html", {"object": obj})


@method_decorator(csrf_exempt, name="dispatch")
class RecentAdminActionsView(APIView):
    def get(self, request, *args, **kwargs):
        recent_actions = LogEntry.objects.order_by("-timestamp")[:10]

        data = []
        for action in recent_actions:
            object_repr = action.object_repr
            change_message = action.changes
            app_label = action.content_type.app_label
            model_name = action.content_type.model

            if action.action == LogEntry.Action.CREATE:
                object_repr = f"Added {object_repr}"
                change_message_str = object_repr
                try:
                    model_class = apps.get_model(
                        app_label=app_label, model_name=model_name
                    )
                    obj = action.content_type.get_object_for_this_type(
                        pk=action.object_pk
                    )

                    obj_url = f"/admin/{app_label}/{model_name}/{obj.pk}/"
                except:
                    obj_url = "Object not found"

            elif action.action == LogEntry.Action.UPDATE:
                object_repr = f"Changed {object_repr}"

                if change_message:
                    change_message = json.loads(change_message)
                    for field, values in change_message.items():
                        old_value = str(values[0])
                        new_value = str(values[1])
                        change_message_str = f"{field}: {old_value} -> {new_value}\n"

                try:
                    obj = action.content_type.get_object_for_this_type(
                        pk=action.object_pk
                    )
                    obj_url = f"/admin/{app_label}/{model_name}/{obj.pk}/"
                except:
                    obj_url = "Failed"

            elif action.action == LogEntry.Action.DELETE:
                object_repr = f"Deleted {object_repr}"
                change_message_str = object_repr
                obj_url = "Not Applicable"

            data.append(
                {
                    "user": str(action.actor),
                    "action_time": action.timestamp,
                    "action_flag": action.get_action_display(),
                    "content_type": str(action.content_type),
                    "app_label": app_label,
                    "model_name": model_name,
                    "object_id": str(action.object_pk),
                    "object_repr": object_repr,
                    "change_message": change_message_str,
                    "obj_url": obj_url,
                }
            )
        return Response(data)

    dispatch = method_decorator(cache_page(60 * 5))(APIView.dispatch)


class ModelMetadataAPIView(generics.RetrieveAPIView):
    def get(self, request, model_name, format=None):
        models = apps.get_models(include_auto_created=True)

        model = next(
            (m for m in models if m.__name__.lower() == model_name.lower()), None
        )

        if model is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = getattr(
            model, "serializer_class", serializers.ModelSerializer
        )
        serializer = serializer_class()
        fields = serializer.get_fields()

        metadata = {
            "modelName": model.__name__,
            "verboseName": model._meta.verbose_name,
            "verboseNamePlural": model._meta.verbose_name_plural,
            "appLabel": model._meta.app_label,
            "primaryKey": model._meta.pk.name,
            "ordering": model._meta.ordering,
            "uniqueTogether": model._meta.unique_together,
            "indexes": model._meta.indexes,
            "permissions": model._meta.permissions,
            "abstract": model._meta.abstract,
            "fields": {},
        }

        for field_name, field in fields.items():
            field_type = field.__class__.__name__
            if field_type == "CharField" and "base_template" in field.style:
                field_type = "TextField"

            related_model = (
                getattr(field, "queryset", None)
                if isinstance(field, serializers.RelatedField)
                else None
            )

            choices = getattr(field, "choices", None)
            if choices:
                choices_dict = dict(choices)
                field_choices = [
                    {"value": value, "display": display}
                    for value, display in choices_dict.items()
                ]
            else:
                field_choices = None

            field_metadata = {
                "type": field_type,
                "required": field.required,
                "read_only": field.read_only,
                "label": field.label,
                "help_text": field.help_text,
                "min_length": getattr(field, "min_length", None),
                "max_length": getattr(field, "max_length", None),
                "min_value": getattr(field, "min_value", None),
                "max_value": getattr(field, "max_value", None),
                "source": getattr(field, "source", None),
                "related_model": related_model.__name__ if related_model else None,
                "choices": field_choices,
            }

            metadata["fields"][field_name] = field_metadata

        for field in model._meta.fields:
            xs_column_count = getattr(field, "xs_column_count", 12)
            md_column_count = getattr(field, "md_column_count", 12)
            justify = getattr(field, "justify", "left")
            markdown = getattr(field, "markdown", "false")
            metadata["fields"][field.name]["xs_column_count"] = xs_column_count
            metadata["fields"][field.name]["md_column_count"] = md_column_count
            metadata["fields"][field.name]["justify"] = justify
            metadata["fields"][field.name]["markdown"] = markdown

        return Response(metadata)


class ModelEndpointAPIView(APIView):
    def get(self, request, format=None):
        models = apps.get_models(include_auto_created=True)

        endpoints = {}

        for model in models:
            app_name = model._meta.app_label
            model_name = model.__name__.lower()
            serializer_class = getattr(model, "serializer_class", None)
            if serializer_class is None:
                continue

            serializer = serializer_class()
            fields = serializer.get_fields()
            metadata = {}

            for field_name, field in fields.items():
                if not field_name == "id":
                    metadata[field_name] = {"type": field.__class__.__name__}

                    if model._meta.get_field(field_name).verbose_name:
                        metadata[field_name]["verbose_name"] = model._meta.get_field(
                            field_name
                        ).verbose_name

            if "alignment" in metadata:
                metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

            try:
                url = reverse(f"{model_name}-list")
                url = url.replace("/api/", "/")
            except NoReverseMatch:
                url = None

            if app_name not in endpoints:
                endpoints[app_name] = []

            endpoints[app_name].append(
                {
                    "model_name": model_name,
                    "verbose_name": model._meta.verbose_name,
                    "verbose_name_plural": model._meta.verbose_name_plural,
                    "url": url,
                    "metadata": metadata,
                    "keys": serializer.FIELD_KEYS,
                }
            )

        return Response(endpoints)


class SingleModelAPIView(APIView):
    def get(self, request, model_name=None, format=None):
        models = apps.get_models(include_auto_created=True)
        model = None

        for m in models:
            if m.__name__.lower() == model_name:
                model = m
                break

        if model is None:
            raise Http404("Model not found")

        serializer_class = getattr(model, "serializer_class", None)

        if serializer_class is None:
            raise Http404("Serializer class not found")

        serializer = serializer_class()
        fields = serializer.get_fields()
        metadata = {}

        for field_name, field in fields.items():
            if not field_name == "id":
                metadata[field_name] = {"type": field.__class__.__name__}

                if model._meta.get_field(field_name).verbose_name:
                    metadata[field_name]["verbose_name"] = model._meta.get_field(
                        field_name
                    ).verbose_name

        try:
            url = reverse(f"{model_name}-list")
            url = url.replace("/api/", "/")
        except NoReverseMatch:
            url = None

        if "alignment" in metadata:
            metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

        endpoint = {
            "app_name": model._meta.app_label,
            "model_name": model_name,
            "verbose_name": model._meta.verbose_name,
            "verbose_name_plural": model._meta.verbose_name_plural,
            "url": url,
            "metadata": metadata,
            "keys": serializer.FIELD_KEYS,
        }

        return Response(endpoint)
