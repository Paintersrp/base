from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import generics, serializers, status
from django.apps import apps
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
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from support.models import Subscribers
from articles.models import Articles, Tags
from django.db.models import Max
from .utils import analyze_django_app


def get_model_metadata(model_name):
    models = apps.get_models(include_auto_created=True)

    model = next((m for m in models if m.__name__.lower() == model_name.lower()), None)

    if model is None:
        return {}

    serializer_class = getattr(model, "serializer_class", serializers.ModelSerializer)
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
        "autoFormLabel": model._meta.autoform_label
        if hasattr(model._meta, "autoform_label")
        else None,
        "longDescription": model._meta.long_description
        if hasattr(model._meta, "long_description")
        else None,
        "shortDescription": model._meta.short_description
        if hasattr(model._meta, "short_description")
        else None,
        "pagesAssociated": model._meta.pages_associated
        if hasattr(model._meta, "pages_associated")
        else None,
        "preview": model._meta.include_preview
        if hasattr(model._meta, "include_preview")
        else False,
        "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
        "icon_class": model._meta.icon_class
        if hasattr(model._meta, "icon_class")
        else None,
        "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
        "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
        "relatedComponents": model._meta.related_components
        if hasattr(model._meta, "related_components")
        else None,
        "visibility": model._meta.visibility
        if hasattr(model._meta, "visibility")
        else None,
        "access_level": model._meta.access_level
        if hasattr(model._meta, "access_level")
        else None,
        "info_dump": model._meta.info_dump
        if hasattr(model._meta, "info_dump")
        else None,
    }

    for field_name, field in fields.items():
        print(field_name)
        field_type = field.__class__.__name__
        if field_type == "CharField" and "base_template" in field.style:
            field_type = "TextField"

        choices = getattr(field, "choices", None)
        print(choices)
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
            "choices": field_choices,
            "verbose_name": getattr(
                model._meta.get_field(field_name), "verbose_name", None
            ),
        }

        metadata["fields"][field_name] = field_metadata

    for field in model._meta.fields:
        if hasattr(field, "xs_column_count"):
            metadata["fields"][field.name]["xs_column_count"] = getattr(
                field, "xs_column_count", 12
            )

        if hasattr(field, "md_column_count"):
            metadata["fields"][field.name]["md_column_count"] = getattr(
                field, "md_column_count", 12
            )

        if hasattr(field, "justify"):
            metadata["fields"][field.name]["justify"] = getattr(
                field, "justify", "left"
            )

        if hasattr(field, "markdown"):
            metadata["fields"][field.name]["markdown"] = getattr(
                field, "markdown", "false"
            )
        if hasattr(field, "min_rows"):
            metadata["fields"][field.name]["min_rows"] = getattr(field, "min_rows", 6)

    return metadata


class ModelMetadataAPIView(APIView):
    def get(self, request, model_name, format=None):
        metadata = get_model_metadata(model_name)
        if not metadata:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(metadata)


@csrf_exempt
def subscribe_to_newsletter(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")

        # add validatation
        subscriber, created = Subscribers.objects.get_or_create(email=email)

        message = Mail(
            from_email="edgelordtest@gmail.com",
            to_emails=email,
            subject="Welcome to Our Newsletter",
            html_content="Thank you for subscribing to our newsletter!",
        )
        try:
            sg = SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
            response = sg.send(message)
        except Exception as e:
            return JsonResponse({"error": "Email failed to send"})

        return JsonResponse({"success": True})

    return JsonResponse({"error": "Invalid request method"})


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
        items = request.query_params.get("items", 10)
        app = request.query_params.get("app", None)
        model_query = request.query_params.get("model", None)
        all_models = apps.get_models()

        if items == "all":
            if app:
                recent_actions = LogEntry.objects.filter(
                    content_type__app_label=app
                ).order_by("-timestamp")
            elif model_query:
                if model_query == "messages":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="support"
                    )
                elif (
                    model_query == "questionnaire"
                    or model_query == "questionset"
                    or model_query == "question"
                    or model_query == "answerchoice"
                ):
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="quizes"
                    )
                elif model_query == "teammember":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="contact"
                    )
                elif (
                    model_query == "servicetablelabels"
                    or model_query == "servicecomparerows"
                    or model_query == "servicetable"
                ):
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="tables"
                    )
                elif model_query == "header":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="general"
                    )
                elif model_query == "contactinformation":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="contact"
                    )
                else:
                    content_type = ContentType.objects.get(model=model_query.lower())

                recent_actions = LogEntry.objects.filter(
                    content_type=content_type
                ).order_by("-timestamp")
            else:
                recent_actions = LogEntry.objects.order_by("-timestamp")
        else:
            if app:
                recent_actions = LogEntry.objects.filter(
                    content_type__app_label=app
                ).order_by("-timestamp")[: int(items)]

            elif model_query:
                if model_query == "messages":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="support"
                    )
                elif (
                    model_query == "questionnaire"
                    or model_query == "questionset"
                    or model_query == "question"
                    or model_query == "answerchoice"
                ):
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="quizes"
                    )
                elif model_query == "teammember":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="contact"
                    )
                elif (
                    model_query == "servicetablelabels"
                    or model_query == "servicecomparerows"
                    or model_query == "servicetable"
                ):
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="tables"
                    )
                elif model_query == "header":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="general"
                    )
                elif model_query == "contactinformation":
                    content_type = ContentType.objects.get(
                        model=model_query.lower(), app_label="contact"
                    )
                else:
                    content_type = ContentType.objects.get(model=model_query.lower())

                recent_actions = LogEntry.objects.filter(
                    content_type=content_type
                ).order_by("-timestamp")[: int(items)]
            else:
                recent_actions = LogEntry.objects.order_by("-timestamp")[: int(items)]

        data = []
        for action in recent_actions:
            object_repr = action.object_repr
            change_message = action.changes
            app_label = action.content_type.app_label
            model_name = action.content_type.model
            change_message_str = ""

            try:
                model_class = apps.get_model(app_label=app_label, model_name=model_name)
                model_verbose_name = model_class._meta.verbose_name.title()
            except:
                model_verbose_name = "Not Found"

            if action.action == LogEntry.Action.CREATE:
                object_repr = f"Added {object_repr}"
                change_message_str = object_repr
                try:
                    obj = action.content_type.get_object_for_this_type(
                        pk=action.object_pk
                    )

                    if model_name == "messages" or model_name == "application":
                        obj_url = f"/admin/{model_name}/read/{obj.pk}/"
                    else:
                        obj_url = f"/admin/{model_name}/control/{obj.pk}/"
                except:
                    try:
                        obj = action.content_type.get_object_for_this_type(
                            pk=action.object_id
                        )

                        if model_name == "messages" or model_name == "application":
                            obj_url = f"/admin/{model_name}/read/{obj.pk}/"
                        else:
                            obj_url = f"/admin/{model_name}/control/{obj.pk}/"
                    except:
                        obj_url = "Object not found"

            elif action.action == LogEntry.Action.UPDATE:
                object_repr = f"Changed {object_repr}"
                change_message_str = change_message

                try:
                    obj = action.content_type.get_object_for_this_type(
                        pk=action.object_pk
                    )

                    if model_name == "messages" or model_name == "application":
                        obj_url = f"/admin/{model_name}/read/{obj.pk}/"
                    else:
                        obj_url = f"/admin/{model_name}/control/{obj.pk}/"
                except:
                    try:
                        obj = action.content_type.get_object_for_this_type(
                            pk=action.object_id
                        )

                        if model_name == "messages" or model_name == "application":
                            obj_url = f"/admin/{model_name}/read/{obj.pk}/"
                        else:
                            obj_url = f"/admin/{model_name}/control/{obj.pk}/"
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
                    "action_flag": action.get_action_display().capitalize(),
                    "content_type": str(action.content_type),
                    "app_label": app_label.capitalize(),
                    "model_name": model_verbose_name,
                    "object_id": str(action.object_pk),
                    "object_repr": object_repr,
                    "change_message": change_message_str,
                    "obj_url": obj_url,
                }
            )

        return Response(data)

    dispatch = method_decorator(cache_page(60 * 5))(APIView.dispatch)


class ModelEndpointAPIView(APIView):
    def get(self, request, format=None):
        models = apps.get_models(include_auto_created=True)
        app_configs = {
            app_config.label: app_config for app_config in apps.get_app_configs()
        }

        endpoints = {
            "configs": {},
            "models": {},
        }

        for app_label, app_config in app_configs.items():
            if (
                app_label == "authorization"
                or app_label == "articles"
                or app_label == "landing"
                or app_label == "about"
                or app_label == "services"
                or app_label == "support"
                or app_label == "jobs"
                or app_label == "general"
                or app_label == "tables"
                or app_label == "quizes"
                or app_label == "contact"
                or app_label == "content"
            ):
                endpoints["configs"][app_label] = {
                    "icon": app_config.icon if hasattr(app_config, "icon") else None,
                    "links": app_config.links if hasattr(app_config, "links") else None,
                    "visibility": app_config.visibility
                    if hasattr(app_config, "visibility")
                    else None,
                }
                endpoints["models"][app_label] = []

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

                    try:
                        if model._meta.get_field(field_name).verbose_name:
                            metadata[field_name][
                                "verbose_name"
                            ] = model._meta.get_field(field_name).verbose_name
                    except:
                        metadata[field_name]["verbose_name"] = None

            if "alignment" in metadata:
                metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

            try:
                url = reverse(f"{model_name}-list")
                url = url.replace("/api/", "/")
            except NoReverseMatch:
                url = None

            endpoint = {
                "model_name": model_name,
                "verbose_name": model._meta.verbose_name,
                "verbose_name_plural": model._meta.verbose_name_plural,
                "url": url,
                "metadata": metadata,
                "keys": serializer.FIELD_KEYS,
                "autoFormLabel": model._meta.autoform_label
                if hasattr(model._meta, "autoform_label")
                else None,
                "longDescription": model._meta.long_description
                if hasattr(model._meta, "long_description")
                else None,
                "shortDescription": model._meta.short_description
                if hasattr(model._meta, "short_description")
                else None,
                "pagesAssociated": model._meta.pages_associated
                if hasattr(model._meta, "pages_associated")
                else None,
                "preview": model._meta.include_preview
                if hasattr(model._meta, "include_preview")
                else False,
                "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
                "icon_class": model._meta.icon_class
                if hasattr(model._meta, "icon_class")
                else None,
                "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
                "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
                "relatedComponents": model._meta.related_components
                if hasattr(model._meta, "related_components")
                else None,
                "visibility": model._meta.visibility
                if hasattr(model._meta, "visibility")
                else None,
                "access_level": model._meta.access_level
                if hasattr(model._meta, "access_level")
                else None,
                "info_dump": model._meta.info_dump
                if hasattr(model._meta, "info_dump")
                else None,
            }

            if hasattr(serializer, "SEARCH_KEYS"):
                endpoint["search_keys"] = serializer.SEARCH_KEYS

            endpoints["models"][app_name].append(endpoint)

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

                try:
                    if model._meta.get_field(field_name).verbose_name:
                        metadata[field_name]["verbose_name"] = model._meta.get_field(
                            field_name
                        ).verbose_name
                except:
                    metadata[field_name]["verbose_name"] = "Default"
        try:
            url = reverse(f"{model_name}-list")
            url = url.replace("/api/", "/")
        except NoReverseMatch:
            url = None

        if "alignment" in metadata:
            metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

        # metadata.update(
        #     {
        #         "autoFormLabel": model._meta.autoform_label
        #         if hasattr(model._meta, "autoform_label")
        #         else None,
        #         "longDescription": model._meta.long_description
        #         if hasattr(model._meta, "long_description")
        #         else None,
        #         "shortDescription": model._meta.short_description
        #         if hasattr(model._meta, "short_description")
        #         else None,
        #         "pagesAssociated": model._meta.pages_associated
        #         if hasattr(model._meta, "pages_associated")
        #         else None,
        #         "preview": model._meta.include_preview
        #         if hasattr(model._meta, "include_preview")
        #         else False,
        #         "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
        #         "icon_class": model._meta.icon_class
        #         if hasattr(model._meta, "icon_class")
        #         else None,
        #         "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
        #         "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
        #         "relatedComponents": model._meta.related_components
        #         if hasattr(model._meta, "related_components")
        #         else None,
        #         "visibility": model._meta.visibility
        #         if hasattr(model._meta, "visibility")
        #         else None,
        #         "access_level": model._meta.access_level
        #         if hasattr(model._meta, "access_level")
        #         else None,
        #         "object_count": model.objects.aggregate(max_id=Max("id"))["max_id"],
        #     }
        # )

        endpoint = {
            "app_name": model._meta.app_label,
            "model_name": model_name,
            "verbose_name": model._meta.verbose_name,
            "verbose_name_plural": model._meta.verbose_name_plural,
            "url": url,
            "metadata": metadata,
            "keys": serializer.FIELD_KEYS,
            "autoFormLabel": model._meta.autoform_label
            if hasattr(model._meta, "autoform_label")
            else None,
            "longDescription": model._meta.long_description
            if hasattr(model._meta, "long_description")
            else None,
            "shortDescription": model._meta.short_description
            if hasattr(model._meta, "short_description")
            else None,
            "pagesAssociated": model._meta.pages_associated
            if hasattr(model._meta, "pages_associated")
            else None,
            "preview": model._meta.include_preview
            if hasattr(model._meta, "include_preview")
            else False,
            "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
            "icon_class": model._meta.icon_class
            if hasattr(model._meta, "icon_class")
            else None,
            "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
            "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
            "relatedComponents": model._meta.related_components
            if hasattr(model._meta, "related_components")
            else None,
            "visibility": model._meta.visibility
            if hasattr(model._meta, "visibility")
            else None,
            "access_level": model._meta.access_level
            if hasattr(model._meta, "access_level")
            else None,
            "info_dump": model._meta.info_dump
            if hasattr(model._meta, "info_dump")
            else None,
        }

        if hasattr(serializer, "SEARCH_KEYS"):
            endpoint["search_keys"] = serializer.SEARCH_KEYS

        if model_name == "tags":
            tag_counts = {}
            articles = Articles.objects.all()
            all_tags = Tags.objects.all()

            for tag in all_tags:
                tag_counts[tag.detail] = 0

            for article in articles:
                for tag in article.tags.all():
                    if tag.detail not in tag_counts:
                        tag_counts[tag.detail] = 1
                    else:
                        tag_counts[tag.detail] += 1

            endpoint["count"] = {
                "type": "integer",
                "verbose_name": "Article Count",
                "values": tag_counts,
            }

        return Response(endpoint)


class SingleAppEndpointAPIView(APIView):
    def get(self, request, app_name=None, format=None):
        app_config = apps.get_app_config(app_name)
        models = app_config.get_models()

        endpoints = {
            "models": {},
            "config": None,
        }

        if (
            app_name == "authorization"
            or app_name == "articles"
            or app_name == "landing"
            or app_name == "about"
            or app_name == "services"
            or app_name == "support"
            or app_name == "jobs"
            or app_name == "general"
            or app_name == "tables"
            or app_name == "quizes"
            or app_name == "contact"
            or app_name == "content"
        ):
            endpoints["config"] = {
                "icon": app_config.icon if hasattr(app_config, "icon") else None,
                "links": app_config.links if hasattr(app_config, "links") else None,
                "app_info": analyze_django_app(app_config.get_models()),
            }

        for model in models:
            model_name = model.__name__.lower()
            endpoints["models"][model_name] = []
            serializer_class = getattr(model, "serializer_class", None)
            if serializer_class is None:
                continue

            serializer = serializer_class()
            fields = serializer.get_fields()
            metadata = {}

            for field_name, field in fields.items():
                if not field_name == "id":
                    metadata[field_name] = {"type": field.__class__.__name__}

                    try:
                        if model._meta.get_field(field_name).verbose_name:
                            metadata[field_name][
                                "verbose_name"
                            ] = model._meta.get_field(field_name).verbose_name
                    except:
                        metadata[field_name]["verbose_name"] = None

            if "alignment" in metadata:
                metadata["alignment"]["choices"] = dict(model.ALIGNMENT_CHOICES)

            try:
                url = reverse(f"{model_name}-list")
                url = url.replace("/api/", "/")
            except NoReverseMatch:
                url = None

            endpoint = {
                "model_name": model_name,
                "verbose_name": model._meta.verbose_name,
                "verbose_name_plural": model._meta.verbose_name_plural,
                "url": url,
                "metadata": metadata,
                "keys": serializer.FIELD_KEYS,
                "autoFormLabel": model._meta.autoform_label
                if hasattr(model._meta, "autoform_label")
                else None,
                "longDescription": model._meta.long_description
                if hasattr(model._meta, "long_description")
                else None,
                "shortDescription": model._meta.short_description
                if hasattr(model._meta, "short_description")
                else None,
                "pagesAssociated": model._meta.pages_associated
                if hasattr(model._meta, "pages_associated")
                else None,
                "preview": model._meta.include_preview
                if hasattr(model._meta, "include_preview")
                else False,
                "icon": model._meta.icon if hasattr(model._meta, "icon") else None,
                "icon_class": model._meta.icon_class
                if hasattr(model._meta, "icon_class")
                else None,
                "slug": model._meta.slug if hasattr(model._meta, "slug") else None,
                "tags": model._meta.tags if hasattr(model._meta, "tags") else False,
                "relatedComponents": model._meta.related_components
                if hasattr(model._meta, "related_components")
                else None,
                "visibility": model._meta.visibility
                if hasattr(model._meta, "visibility")
                else None,
                "access_level": model._meta.access_level
                if hasattr(model._meta, "access_level")
                else None,
            }

            if hasattr(serializer, "SEARCH_KEYS"):
                endpoint["search_keys"] = serializer.SEARCH_KEYS

            endpoints["models"][model_name].append(endpoint)

        return Response(endpoints)
