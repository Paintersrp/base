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
from django.apps import apps


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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
                getattr(field, "queryset", None).model
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

            # Add field metadata to the metadata dictionary
            metadata["fields"][field_name] = field_metadata

        return Response(metadata)


# class ModelMetadataAPIView(generics.RetrieveAPIView):
#     def get(self, request, model_name, format=None):
#         models = apps.get_models(include_auto_created=True)

#         model = next(
#             (m for m in models if m.__name__.lower() == model_name.lower()), None
#         )

#         if model is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer_class = getattr(
#             model, "serializer_class", serializers.ModelSerializer
#         )
#         serializer = serializer_class()
#         fields = serializer.get_fields()

#         metadata = {}
#         for field_name, field in fields.items():
#             field_type = field.__class__.__name__
#             if field_type == "CharField" and "base_template" in field.style:
#                 field_type = "TextField"
#             metadata[field_name] = {"type": field_type}

#         metadata["modelName"] = model.__name__

#         if "alignment" in metadata:
#             metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

#         return Response(metadata)


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
            metadata = {
                field_name: {"type": field.__class__.__name__}
                for field_name, field in fields.items()
            }

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
