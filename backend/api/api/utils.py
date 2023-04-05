from auditlog.models import LogEntry
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.forms.models import model_to_dict
from django.db.models.functions import Length
from django.db.models import Avg
from pages.serializers import PageObjNameSerializer
from django.apps import apps
from django.db import models
import json


def get_filter_choices(model, filter_options):
    filter_choices = {}

    for option in filter_options:
        field = model._meta.get_field(option)
        if isinstance(field, models.ForeignKey) or isinstance(
            field, models.ManyToManyField
        ):
            related_model = field.related_model
            choices_qs = related_model.objects.all()
            choices = [{"value": c.pk, "display_name": str(c)} for c in choices_qs]
        else:
            choices_qs = (
                model.objects.order_by().values_list(option, flat=True).distinct()
            )
            choices = [{"value": c, "display_name": str(c)} for c in choices_qs]

        filter_choices[option] = choices

    return filter_choices


def analyze_django_app(models):
    """
    Analyze a Django app and provide statistics about its models.

    Parameters:
        app_name (str): The name of the Django app to analyze.

    Returns:
        dict: A dictionary containing various statistics about the app's models.
    """
    num_models = 0
    num_objects = 0
    model_stats = []

    for model in models:
        model_stats.append(
            {
                "name": model._meta.verbose_name,
                "icon": model._meta.icon,
                "related_components": model._meta.related_components,
                "related_components_count": len(model._meta.related_components),
                "num_objects": model.objects.count(),
                "visibility": model._meta.visibility,
            }
        )
        num_models += 1
        num_objects += model.objects.count()

    return {
        "num_models": num_models,
        "num_objects": num_objects,
        "models": model_stats,
    }


def return_change_message_str(changes):
    change_message_str = ""
    num_changes = len(changes)
    for i, (field, values) in enumerate(changes.items()):
        old_value, new_value = values
        change_message_str += f"{field}: {old_value} -> {new_value}"
        if i < num_changes - 1:
            change_message_str += ", "

    return change_message_str


def return_changes(instance, old_instance):
    changes = {}

    for field in instance._meta.fields:
        field_name = field.name
        if str(getattr(instance, field_name)) != str(getattr(old_instance, field_name)):
            changes[field_name] = [
                getattr(old_instance, field_name),
                getattr(instance, field_name),
            ]

    change_message_str = return_change_message_str(changes)

    return change_message_str


def create_log_entry(action, username, instance, changes):
    content_type = ContentType.objects.get_for_model(instance)

    if not changes:
        changes = ""

    log_entry = LogEntry(
        content_type=content_type,
        object_id=instance.pk,
        object_repr=str(instance),
        action=action,
        actor=username,
        changes=changes,
        timestamp=timezone.now(),
    )
    log_entry.save()


def get_serialized_page_data(model_dict, request):
    data = {}
    for model_name, model_options in model_dict.items():
        many = True
        app_label = model_options.get("app_label", {})
        model = apps.get_model(app_label=app_label, model_name=model_name)

        if model_options.get("filter", False):
            queryset = model.objects.filter(**model_options.get("filter", {}))

        elif model_options.get("get_first", False):
            queryset = model.objects.first()
            many = False

        else:
            queryset = model.objects.all()

        if model_name == "Page":
            serializer = PageObjNameSerializer(
                instance=queryset, many=many, context={"request": request}
            )
        else:
            serializer = model.serializer_class(
                instance=queryset, many=many, context={"request": request}
            )

        data[model_name] = serializer.data

    return data



