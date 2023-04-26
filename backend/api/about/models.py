from django.db import models
from .metadata import *
from api.customs import *


@metadata(**ABOUT_BLOCK_METADATA)
class AboutBlock(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="About Block Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Company Name",
    )
    image = CustomImageFieldField(
        upload_to="about",
        verbose_name="Image",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "About Header"
        verbose_name_plural = verbose_name + "s"


@metadata(**MISSION_STATEMENT_METADATA)
class MissionStatement(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Mission Statement Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        justify="center",
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Mission Statement Body",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


@metadata(**COMPANY_HISTORY_METADATA)
class CompanyHistory(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Company History Name",
        help_text="Referential Name",
    )
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Company History Body",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Company History"
        verbose_name_plural = verbose_name + "s"


@metadata(**VALUE_METADATA)
class Value(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Title",
        help_text="Value Title",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Value Icon",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"


@metadata(**CATEGORY_METADATA)
class Category(models.Model):
    name = CustomCharField(
        max_length=100,
        verbose_name="Category",
        md_column_count=12,
        help_text="Category Name",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "FAQ Categories"
        verbose_name_plural = verbose_name + "Categories"


@metadata(**FAQ_METADATA)
class FAQ(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="FAQ Name",
        help_text="Referential Name",
        db_index=True,
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Category",
        help_text="FAQ Category",
    )

    question = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Question",
        help_text="FAQ Question",
        min_rows=3,
    )
    answer = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Answer",
        help_text="FAQ Answer",
        min_rows=3,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["category"]
        verbose_name = "FAQ"
        verbose_name_plural = verbose_name + "s"
