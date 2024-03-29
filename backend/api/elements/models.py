from django.db import models
from api.customs import *
from api.utils import *
from authorization.models import User
from .metadata import *
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


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

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    class Meta:
        abstract = True


@metadata(**ELEMENT_SET_CATEGORY_METADATA)
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
        ordering = ["-id"]
        verbose_name = "Element Set Category"
        verbose_name_plural = "Element Set Category"


@metadata(**ELEMENT_METADATA)
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
        default="Placeholder",
    )

    subtype = CustomCharField(
        max_length=10,
        verbose_name="Element Subtype",
        help_text="Element Subtype",
        md_column_count=6,
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

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Element"
        verbose_name_plural = "Elements"


@metadata(**IMAGE_TAG_METADATA)
class ImageTag(models.Model):
    name = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Tag Name",
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    def __str__(self):
        return self.name

    def image_count(self):
        return self.imageelement_set.count()

    image_count.short_description = "Image Count"

    class Meta:
        verbose_name = "Image Tag"
        verbose_name_plural = "Image Tags"


@metadata(**IMAGE_ELEMENT_METADATA)
class ImageElement(BaseElement):
    TYPES = (
        ("Small", "Small"),
        ("Medium", "Medium"),
        ("Full", "Full"),
    )

    JUSTIFICATION_OPTIONS = (
        ("Left", "Left"),
        ("Center", "Center"),
        ("Right", "Right"),
    )

    type = CustomCharField(
        max_length=6,
        verbose_name="Image Size",
        help_text="Image Size",
        md_column_count=6,
        choices=TYPES,
        default="Medium",
    )

    justify = CustomCharField(
        max_length=10,
        verbose_name="Image Placement",
        help_text="Image Placement",
        md_column_count=6,
        choices=JUSTIFICATION_OPTIONS,
        default="Center",
    )

    image = models.ImageField(
        upload_to="imagelements",
        verbose_name="Image",
        help_text="Image",
    )

    caption = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Image Caption",
        help_text="Image Caption",
        blank=True,
        null=True,
    )

    tag = CustomForeignKeyField(
        ImageTag,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Tag",
        related_query_name="tag",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Image Element"
        verbose_name_plural = "Image Elements"


@metadata(**HEADER_ELEMENT_METADATA)
class HeaderElement(BaseElement):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    TYPES = (
        ("H1", "H1 (Page)"),
        ("H2", "H2 (Page)"),
        ("H3", "H3 (Section)"),
        ("H4", "H4 (Section)"),
        ("H5", "H5 (Content)"),
        ("H6", "H6 (Content)"),
    )

    type = CustomCharField(
        max_length=2,
        verbose_name="Header Type",
        help_text="Header Type",
        md_column_count=6,
        choices=TYPES,
        default="H3",
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
        default="Center",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Header Element"
        verbose_name_plural = "Header Elements"


@metadata(**TEXT_ELEMENT_METADATA)
class TextElement(BaseElement):
    TYPES = (
        ("Standard", "Standard"),
        ("Dense", "Dense"),
    )

    type = CustomCharField(
        max_length=10,
        verbose_name="Text Type",
        help_text="Text Type",
        md_column_count=6,
        choices=TYPES,
        default="Standard",
    )

    header = CustomForeignKeyField(
        HeaderElement,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Header",
        related_query_name="text_header",
        blank=True,
        null=True,
    )

    text = CustomTextField(
        max_length=5000,
        md_column_count=12,
        verbose_name="Text",
        help_text="Text",
        blank=True,
        null=True,
        markdown=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Text Element"
        verbose_name_plural = "Text Elements"


@metadata(**ELEMENT_SET_METADATA)
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
        ordering = ["-id"]
        verbose_name = "Element Set"
        verbose_name_plural = "Element Sets"


@metadata(**LIST_ITEM_TAG_METADATA)
class ListItemTag(models.Model):
    name = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Tag Name",
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "List Item Tag"
        verbose_name_plural = "List Item Tags"


@metadata(**LIST_ELEMENT_ITEM_METADATA)
class ListElementItem(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="List Element Item Name",
        help_text="List Element Item Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )

    tag = CustomForeignKeyField(
        ListItemTag,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Tag",
        related_query_name="tag",
    )

    order = CustomPositiveIntegerField(
        default=0,
        verbose_name="Page Appearance Order",
        md_column_count=6,
    )

    primary = CustomCharField(
        max_length=300,
        verbose_name="Primary List Text",
        help_text="Primary List Text",
        md_column_count=6,
        null=True,
        blank=True,
    )

    secondary = CustomCharField(
        max_length=300,
        verbose_name="Secondary List Text",
        help_text="Secondary List Text",
        md_column_count=6,
        null=True,
        blank=True,
    )

    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="List Item Icon",
        help_text="Select List Item Icon (Optional)",
        null=True,
        blank=True,
    )

    image = models.ImageField(
        upload_to="process_images",
        verbose_name="Image",
        null=True,
        blank=True,
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "List Element Item"
        verbose_name_plural = "List Element Items"


@metadata(**LIST_ELEMENT_METADATA)
class ListElement(BaseElement):
    TYPES = (
        ("Standard", "Standard"),
        ("Icon", "Icon"),
        ("Image", "Image"),
        ("Avatar", "Avatar"),
    )

    type = CustomCharField(
        max_length=10,
        verbose_name="List Type",
        help_text="List Type",
        md_column_count=6,
        choices=TYPES,
        default="Standard",
    )

    items = models.ManyToManyField(ListElementItem)

    class Meta:
        ordering = ["-id"]
        verbose_name = "List Element"
        verbose_name_plural = "List Elements"


@metadata(**CARD_ELEMENT_METADATA)
class CardElement(BaseElement):
    TYPES = (
        ("Tile", "Tile"),
        ("Standard", "Standard"),
        ("Dense", "Dense"),
    )

    type = CustomCharField(
        max_length=10,
        verbose_name="Card Type",
        help_text="Card Type",
        md_column_count=6,
        choices=TYPES,
        default="Standard",
    )

    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Card Icon",
        help_text="Select Card Icon (Optional)",
        null=True,
        blank=True,
    )

    image = models.ImageField(
        upload_to="cardimage",
        verbose_name="Card Image (Optional)",
        help_text="Card Image (Optional)",
        null=True,
        blank=True,
    )

    header = CustomCharField(
        max_length=100,
        verbose_name="Card Header Text (Optional)",
        help_text="Card Header Text (Optional)",
        md_column_count=6,
        null=True,
        blank=True,
    )

    subheader = CustomCharField(
        max_length=100,
        verbose_name="Card Subheader Text (Optional)",
        help_text="Card Subheader Text (Optional)",
        md_column_count=6,
        null=True,
        blank=True,
    )

    primary = CustomTextField(
        max_length=1000,
        verbose_name="Primary Card Text",
        help_text="Primary Card Text",
        md_column_count=6,
        min_rows=6,
        null=True,
        blank=True,
    )

    secondary = CustomTextField(
        max_length=1000,
        verbose_name="Secondary Card Text (Optional)",
        help_text="Secondary Card Text (Optional)",
        md_column_count=6,
        min_rows=6,
        null=True,
        blank=True,
    )

    share_toggle = CustomBooleanField(
        default=False,
        verbose_name="Share Toggle",
        help_text="Share Toggle",
        justify="left",
        md_column_count=12,
    )

    button_toggle = CustomBooleanField(
        default=False,
        verbose_name="Button Toggle",
        help_text="Button Toggle",
        justify="left",
        md_column_count=12,
    )

    class Meta:
        ordering = ["-id"]
        verbose_name = "Card Element"
        verbose_name_plural = "Card Elements"
