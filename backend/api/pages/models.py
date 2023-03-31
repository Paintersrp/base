from django.db import models
from api.customs import *
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q


@custom_metadata(
    autoform_label="Hero Section",
    long_description="This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
    short_description="A model for creating hero sections.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="hero",
    tags=["Landing", "Hero", "Company"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class Component(models.Model):
    COMPONENT_TYPES = (
        ("ServiceTier", "ServiceTier"),
        ("Value", "Value"),
        ("About", "About"),
        ("FAQ", "FAQ"),
        ("Hero", "Hero"),
        ("Processes", "Processes"),
        ("LatestNews", "LatestNews"),
        ("NewsletterForm", "NewsletterForm"),
        ("IconScroller", "IconScroller"),
        ("Quiz", "Quiz"),
        ("TeamMember", "TeamMember"),
        ("JobPosting", "JobPosting"),
        ("ContactInformation", "ContactInformation"),
        ("Socials", "Socials"),
        ("Hours", "Hours"),
        ("Contact", "Contact"),
        ("Articles", "Articles")
        # ("IconScroller", "IconScroller"),
    )
    component_name = models.CharField(max_length=50, choices=COMPONENT_TYPES)
    query_set = CustomCharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name="Query Option",
        help_text="Query Option",
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Order")
    props = models.JSONField(default=dict, verbose_name="Props", blank=True)

    class Meta:
        verbose_name = "Components"
        verbose_name_plural = "Components"


@custom_metadata(
    autoform_label="Page Content",
    long_description="This model represents a set of page content.",
    short_description="A model for creating pages and page content.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="hero",
    tags=["Landing", "Hero", "Company"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class Page(models.Model):
    page_name = CustomCharField(
        max_length=50, verbose_name="Page Name", help_text="Page Name"
    )
    components = models.ManyToManyField(
        Component, verbose_name="Components", help_text="Components"
    )
    verbose_name = CustomCharField(
        max_length=50,
        verbose_name="Page Display Name",
        help_text="Page Display Name",
        default="Placeholder",
    )

    class Meta:
        verbose_name = "Pages"
        verbose_name_plural = "Pages"


ALLOWED_APPS = {
    "authorization",
    "articles",
    "landing",
    "about",
    "services",
    "support",
    "jobs",
    "general",
    "tables",
    "quizes",
    "contact",
    "content",
    "pages",
}


@custom_metadata(
    autoform_label="Page Content",
    long_description="This model represents a set of page content.",
    short_description="A model for creating pages and page content.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="hero",
    tags=["Landing", "Hero", "Company"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class ComponentObj(models.Model):
    name = models.CharField(max_length=50)
    content = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to=Q(app_label__in=ALLOWED_APPS),
        verbose_name="Data Model Name",
    )
    query_params = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Query Parameters",
        help_text="Query parameters to filter the data source",
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Order")


@custom_metadata(
    autoform_label="Page Content",
    long_description="This model represents a set of page content.",
    short_description="A model for creating pages and page content.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="hero",
    tags=["Landing", "Hero", "Company"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class PageObj(models.Model):
    page_name = CustomCharField(
        max_length=50, verbose_name="Page Name", help_text="Page Name"
    )
    components = models.ManyToManyField(
        ComponentObj, verbose_name="Components", help_text="Components"
    )
    verbose_name = CustomCharField(
        max_length=50,
        verbose_name="Page Display Name",
        help_text="Page Display Name",
        default="Placeholder",
    )

    class Meta:
        verbose_name = "Pages2"
        verbose_name_plural = "Pages2"
