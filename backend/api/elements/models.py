from django.db import models
from api.customs import *
from api.utils import *
from authorization.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.apps import apps

# author = CustomForeignKeyField(
#         User,
#         on_delete=models.SET_DEFAULT,
#         default=1,
#         verbose_name="Author",
#         related_query_name="author",
#     )

class BaseElement(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Element Name",
        help_text="Element Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    order = CustomPositiveIntegerField(
        default=0,
        verbose_name="Page Appearance Order",
        md_column_count=6,
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id", "name"],
    allowed=True,
)
class ElementSetCategory(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Category Name",
        help_text="Category Name",
        md_column_count=12,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Element Set Category"
        verbose_name_plural = "Element Set Category"


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id"],
    allowed=True,
)
class Element(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Element Name",
        help_text="Element Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    type = CustomCharField(
        max_length=10,
        verbose_name="Element Type",
        help_text="Element Type",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Element"
        verbose_name_plural = "Elements"


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id"],
    allowed=True,
)
class TextElement(BaseElement):
    text = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Text",
        help_text="Text",
        min_rows=3,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Text Element"
        verbose_name_plural = "Text Elements"


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id"],
    allowed=True,
)
class ImageElement(BaseElement):
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Image Element"
        verbose_name_plural = "Image Elements"


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id"],
    allowed=True,
)
class HeaderElement(BaseElement):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    title = CustomCharField(
        max_length=100,
        verbose_name="Header Title",
        help_text="Header Title",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    subtitle = CustomCharField(
        max_length=100,
        verbose_name="Header Subtitle",
        help_text="Header Subtitle (Optional)",
        md_column_count=6,
        blank=True,
        null=True,
    )
    tagline = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Tagline",
        help_text="Tagline (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    bottom_divider = CustomBooleanField(
        default=False,
        verbose_name="Bottom Divider",
        help_text="Bottom Divider",
        justify="right",
    )
    top_divider = CustomBooleanField(
        default=False,
        verbose_name="Top Divider",
        help_text="Top Divider",
        justify="right",
    )
    alignment = CustomCharField(
        max_length=10,
        choices=ALIGNMENT_CHOICES,
        md_column_count=6,
        verbose_name="Text Alignment",
        help_text="Text Alignment",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Header Element"
        verbose_name_plural = "Header Elements"


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id"],
    allowed=True,
)
class ElementSet(models.Model):
    name = models.CharField(max_length=100)
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    elements = models.ManyToManyField(Element)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Element Set"
        verbose_name_plural = "Element Sets"
