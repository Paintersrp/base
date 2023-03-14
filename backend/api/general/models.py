from django.db import models
from api.customs import *
from auditlog.registry import auditlog


class Header(models.Model):
    page = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Page",
    )
    title = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Title",
    )
    description = CustomTextField(
        max_length=300,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
    )
    keywords = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Keywords",
    )
    image = models.ImageField(verbose_name="Image", upload_to="seo_images")
    url = CustomURLField(
        verbose_name="URL",
        md_column_count=6,
    )

    class Meta:
        verbose_name = "SEO Headers"
        verbose_name_plural = "SEO Headers"


auditlog.register(Header)
