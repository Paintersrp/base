from django.db import models
from api.customs import *
from .metadata import *


@metadata(**MESSAGE_METADATA)
class Messages(models.Model):
    name = CustomCharField(
        max_length=50,
        md_column_count=6,
        verbose_name="Name",
        help_text="Full Name",
    )
    email = CustomEmailField(
        md_column_count=6,
        verbose_name="Email",
        help_text="Email Address",
    )
    phone = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Phone Number",
    )
    subject = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Subject",
        help_text="Message Subject",
    )
    message = CustomTextField(
        max_length=20000,
        md_column_count=12,
        verbose_name="Message",
        help_text="Message Content",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
    )
    is_read = CustomBooleanField(
        default=False,
        md_column_count=12,
        justify="flex-start",
        verbose_name="Is Read",
        help_text="Is Read Status",
        db_index=True,
    )
    is_archived = CustomBooleanField(
        default=False,
        md_column_count=12,
        justify="flex-start",
        verbose_name="Is Archived",
        help_text="Is Archived Status",
        db_index=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Messages"
        verbose_name_plural = "Messages"


@metadata(**SUBSCRIBER_METADATA)
class Subscribers(models.Model):
    email = CustomEmailField(
        unique=True,
        md_column_count=12,
        verbose_name="Email",
        help_text="Email Address",
        db_index=True,
    )
    subscribed_on = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Subscribed On",
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Subscribers"
        verbose_name_plural = "Subscribers"
