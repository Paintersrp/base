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

        metadata = {}
        for field_name, field in fields.items():
            field_type = field.__class__.__name__
            if field_type == "CharField" and "base_template" in field.style:
                field_type = "TextField"
            metadata[field_name] = {"type": field_type}

        metadata["modelName"] = model.__name__

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
            metadata = {
                field_name: {"type": field.__class__.__name__}
                for field_name, field in fields.items()
            }

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
                    "url": url,
                    "metadata": metadata,
                    "keys": serializer.FIELD_KEYS,
                }
            )

        return Response(endpoints)
