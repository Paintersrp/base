from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.admin.models import LogEntry, CHANGE
from django.contrib.contenttypes.models import ContentType
from .customs import BaseModel
from services.models import Benefits
from authorization.models import User


@receiver(post_save, sender=Benefits)
def log_changes(sender, instance, user=None, **kwargs):
    if user:
        user_object = User.objects.get(username=user)

        LogEntry.objects.log_action(
            user_id=user_object.id,
            content_type_id=ContentType.objects.get_for_model(instance).pk,
            object_id=instance.pk,
            object_repr=str(instance),
            action_flag=CHANGE,
            change_message="The following fields were changed: {}.".format(
                ", ".join(
                    [
                        f.name
                        for f in sender._meta.fields
                        if getattr(instance, f.name) != getattr(instance, f.name, None)
                    ]
                )
            ),
        )
        log_entry = LogEntry.objects.latest("id")
        print(log_entry)
