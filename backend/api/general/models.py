from django.db import models
from api.customs import *
from auditlog.registry import auditlog
from .metadata import *


@metadata(**SEO_HEADER_METADATA)
class Header(models.Model):
    page = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Page",
        help_text="Referential Page",
        db_index=True,
    )
    title = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Title",
        help_text="SEO Title",
        min_rows=3,
    )
    description = CustomTextField(
        max_length=300,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="SEO Description",
        min_rows=3,
    )
    keywords = CustomTextField(
        max_length=200,
        md_column_count=6,
        verbose_name="Keywords",
        help_text="SEO Keywords",
        min_rows=3,
    )
    image = models.ImageField(verbose_name="Image", upload_to="seo_images")
    url = CustomURLField(
        verbose_name="URL",
        md_column_count=6,
        help_text="SEO URL",
    )

    def __str__(self):
        return self.page

    class Meta:
        ordering = ["page"]
        verbose_name = "SEO Headers"
        verbose_name_plural = "SEO Headers"


@metadata(**CONTENT_TEXT_BLOCK_METADATA)
class ContentTextBlock(models.Model):
    slug = CustomCharField(
        unique=True,
        max_length=20,
        md_column_count=6,
        verbose_name="Slug",
        help_text="Identifier",
        db_index=True,
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=6,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=300,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )

    def __str__(self):
        return self.slug

    class Meta:
        verbose_name = "Content Text Blocks"
        verbose_name_plural = "Content Text Blocks"
