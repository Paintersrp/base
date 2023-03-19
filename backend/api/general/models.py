from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="SEO Header Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "About": "/about",
        "Services": "/services",
        "Contact": "/contact",
        "News": "/news",
    },
    include_preview=False,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Header(models.Model):
    page = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Page",
        help_text="Top Header Display of Hero Section",
    )
    title = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Title",
        help_text="Top Header Display of Hero Section",
    )
    description = CustomTextField(
        max_length=300,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Top Header Display of Hero Section",
    )
    keywords = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Keywords",
        help_text="Top Header Display of Hero Section",
    )
    image = models.ImageField(verbose_name="Image", upload_to="seo_images")
    url = CustomURLField(
        verbose_name="URL",
        md_column_count=6,
        help_text="Top Header Display of Hero Section",
    )

    class Meta:
        verbose_name = "SEO Headers"
        verbose_name_plural = "SEO Headers"
