from auditlog.models import LogEntry
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.forms.models import model_to_dict
import json


def return_change_message_str(changes):
    change_message_str = ""
    for field, values in changes.items():
        old_value, new_value = values
        change_message_str += f"{field}: {old_value} -> {new_value}\n"

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
    print(change_message_str)

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

    print("content_type: ", content_type)
    print("object_id: ", instance.pk)
    print("object_repr: ", str(instance))
    print("action: ", action)
    print("actor: ", username)
    print("changes: ", changes)
    print("timestamp: ", timezone.now())

    log_entry.save()
