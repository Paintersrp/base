from django.db import models
from api.customs import (
    CustomCharField,
    CustomTextField,
    CustomEmailField,
    CustomBooleanField,
)
from auditlog.registry import auditlog


class Messages(models.Model):
    name = CustomCharField(max_length=50, md_column_count=6, verbose_name="Name")
    email = CustomEmailField(md_column_count=6, verbose_name="Email")
    phone = CustomCharField(max_length=20, md_column_count=6, verbose_name="Phone")
    subject = CustomCharField(max_length=100, md_column_count=4, verbose_name="Subject")
    message = CustomTextField(
        max_length=20000, md_column_count=12, verbose_name="Message"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    is_read = CustomBooleanField(
        default=False, md_column_count=4, justify="center", verbose_name="Is Read"
    )
    is_replied = CustomBooleanField(
        default=False, md_column_count=4, justify="center", verbose_name="Is Replied"
    )
    is_archived = CustomBooleanField(
        default=False, md_column_count=4, justify="center", verbose_name="Is Archived"
    )

    class Meta:
        verbose_name = "Messages"
        verbose_name_plural = "Messages"


class Subscribers(models.Model):
    email = models.EmailField(unique=True, verbose_name="Email")
    subscribed_on = models.DateTimeField(
        auto_now_add=True, verbose_name="Subscribed On"
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Subscribers"
        verbose_name_plural = "Subscribers"


auditlog.register(Messages)
auditlog.register(Subscribers)
