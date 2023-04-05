from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@metadata(
    autoform_label="Message",
    long_description="This model represents messages sent by users to the company, which can be viewed and archived by staff members.",
    short_description="A model for managing user messages.",
    pages_associated={
        "Landing": "/",
        "Support": "/support",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="MessageIcon",
    icon_class=None,
    slug="messages",
    tags=["Messages", "Contact", "Inquiry", "Support", "Company"],
    related_components=["ContactForm", "HeroForm", "ServiceForm", "ReadMessage"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents messages sent by users to the company, which can be viewed and archived by staff members.",
        "fields": {
            "Name": "The name of the person who sent the message.",
            "Email": "The email address of the person who sent the message.",
            "Phone": "The phone number of the person who sent the message.",
            "Subject": "The subject line of the message.",
            "Message": "The content of the message.",
            "Is Read": "Whether the message has been read by a staff member.",
            "Is Archived": "Whether the message has been archived by a staff member.",
            "Created At (Auto-generated)": "The date and time that the message was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Message model reference": "/docs/models/messages/",
            "Support center documentation": "/docs/support/messages/",
        },
    },
    filter_options=[
        "id",
        "name",
        "email",
        "subject",
        "is_read",
        "is_archived",
    ],
    allowed=False,
)
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


@metadata(
    autoform_label="Subscribe",
    long_description="This model represents the subscribers of our company's newsletter.",
    short_description="Model for managing newsletter subscribers.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubscriptionsIcon",
    icon_class=None,
    slug="subscribers",
    tags=["Subscribe", "Contact", "Newsletter"],
    related_components=["Footer", "NewsletterForm"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to store information about subscribers to our company's newsletter. Each Subscriber object represents a unique email address that has opted in to receive our newsletter.",
        "fields": {
            "Email": "The email address of the subscriber.",
            "Subscribed On (Auto-generated)": "The date and time that the subscriber opted in to receive our newsletter.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/fields/",
            "How to manage subscribers": "https://www.example.com/blog/how-to-manage-newsletter-subscribers/",
        },
    },
    filter_options=[
        "id",
        "email",
    ],
    allowed=False,
)
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
