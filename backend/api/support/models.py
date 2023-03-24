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
    info_dump={
        "purpose": "This model represents messages sent by users to the company, which can be viewed, replied to, and archived by staff members.",
        "fields": {
            "name": "The name of the person who sent the message.",
            "email": "The email address of the person who sent the message.",
            "phone": "The phone number of the person who sent the message.",
            "subject": "The subject line of the message.",
            "message": "The content of the message.",
            "created_at": "The date and time that the message was created.",
            "is_read": "Whether the message has been read by a staff member.",
            "is_replied": "Whether a staff member has replied to the message.",
            "is_archived": "Whether the message has been archived by a staff member."
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Message model reference": "/docs/models/messages/",
            "Support center documentation": "/docs/support/messages/"
        }
    }
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
    info_dump={
        "purpose": "This model is used to store information about subscribers to our company's newsletter. Each Subscriber object represents a unique email address that has opted in to receive our newsletter.",
        "fields": {
            "email": "The email address of the subscriber.",
            "subscribed_on": "The date and time that the subscriber opted in to receive our newsletter."
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/fields/",
            "How to manage subscribers": "https://www.example.com/blog/how-to-manage-newsletter-subscribers/"
        },
    }
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
