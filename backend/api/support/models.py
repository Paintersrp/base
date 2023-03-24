from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Message Object",
    long_description="This model represents messages sent by users to the company, which can be viewed, replied to, and archived by staff members.",
    short_description="A model for managing user messages.",
    pages_associated={
        "Landing": "/",
        "Support": "/support",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="MessageIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Messages(models.Model):
    name = CustomCharField(
        max_length=50,
        md_column_count=6,
        verbose_name="Name",
        help_text="Help Text Placeholder",
    )
    email = CustomEmailField(
        md_column_count=6,
        verbose_name="Email",
        help_text="Help Text Placeholder",
    )
    phone = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Help Text Placeholder",
    )
    subject = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Subject",
        help_text="Help Text Placeholder",
    )
    message = CustomTextField(
        max_length=20000,
        md_column_count=12,
        verbose_name="Message",
        help_text="Help Text Placeholder",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    is_read = CustomBooleanField(
        default=False,
        md_column_count=4,
        justify="center",
        verbose_name="Is Read",
        help_text="Help Text Placeholder",
    )
    is_replied = CustomBooleanField(
        default=False,
        md_column_count=4,
        justify="center",
        verbose_name="Is Replied",
        help_text="Help Text Placeholder",
    )
    is_archived = CustomBooleanField(
        default=False,
        md_column_count=4,
        justify="center",
        verbose_name="Is Archived",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Messages"
        verbose_name_plural = "Messages"


@custom_metadata(
    autoform_label="Subscriber Object",
    long_description="This model represents the subscribers of our company's newsletter.",
    short_description="Model for managing newsletter subscribers.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubscriptionsIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Subscribers(models.Model):
    email = CustomEmailField(
        unique=True,
        md_column_count=6,
        verbose_name="Email",
        help_text="Help Text Placeholder",
    )
    subscribed_on = models.DateTimeField(
        auto_now_add=True, verbose_name="Subscribed On"
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Subscribers"
        verbose_name_plural = "Subscribers"
