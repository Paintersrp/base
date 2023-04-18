from django.db import models
from api.customs import *
from api.utils import *
from authorization.models import User
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


@metadata(
    autoform_label="Element Set Category",
    long_description="This model represents a category for element sets.",
    short_description="Model for an element set category",
    pages_associated={
        "Element Sets": "/element-sets",
        "Admin": "/admin/elementsetcategory",
    },
    include_preview=True,
    icon="ElementSetIcon",
    icon_class=None,
    slug="element-set-category",
    tags=["Element Sets", "Categories"],
    related_components=["ElementSet", "ElementSetCategoryIndividual"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a category for element sets.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ElementSetCategory model reference": "/docs/elementsetcategory/",
        },
    },
    allowed=True,
    filter_options=["name"],
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
        ordering = ["-id"]
        verbose_name = "Element Set Category"
        verbose_name_plural = "Element Set Category"


@metadata(
    autoform_label="Element",
    long_description="This model represents an element.",
    short_description="Model for an element",
    pages_associated={
        "Elements": "/elements",
        "Admin": "/admin/element",
    },
    include_preview=True,
    icon="ElementIcon",
    icon_class=None,
    slug="element",
    tags=["Elements"],
    related_components=["ElementIndividual", "ElementListing"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents an element.",
        "fields": {
            "Element Name": "The name of the element.",
            "Element Type": "The type of the element.",
            "Element Subtype": "The subtype of the element.",
            "Description": "A description of the element.",
            "Content Type": "The content type of the element.",
            "Object ID": "The ID of the object.",
            "Content Object": "The content object of the element.",
            "Created At (auto-generated)": "The date and time the element was created.",
            "Updated At (auto-generated)": "The date and time the element was last updated.",
            "Author": "The author of the element.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Element model reference": "/docs/element/",
        },
    },
    allowed=True,
    filter_options=["name", "type", "subtype"],
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


@metadata(
    autoform_label="Text Element",
    long_description="This model represents a text element that can be added to a document.",
    short_description="Model for a text element",
    pages_associated={
        "Elements": "/elements",
        "Document Editor": "/document-editor",
    },
    include_preview=True,
    icon="TextElementIcon",
    icon_class=None,
    slug="text-element",
    tags=["Elements", "Document Editor", "Text"],
    related_components=["TextElementListing", "TextElementView"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a text element that can be added to a document.",
        "fields": {
            "name": "The name of the text element.",
            "type": "The type of the text element (Standard, Light, Dense).",
            "text": "The actual text content of the element.",
            "created_at (auto-generated)": "The date and time the text element was created.",
            "updated_at (auto-generated)": "The date and time the text element was last updated.",
            "author": "The author of the text element.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "BaseElement model reference": "/docs/baseelement/",
        },
    },
    allowed=True,
    filter_options=["name", "type"],
)
class TextElement(BaseElement):
    TYPES = (
        ("Standard", "Standard"),
        ("Light", "Light"),
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
    text = CustomTextField(
        max_length=3000,
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


@metadata(
    autoform_label="Image Tag",
    long_description="This model represents a tag that can be associated with images.",
    short_description="Model for image tags",
    pages_associated={
        "Images": "/images",
        "Tags": "/tags",
    },
    include_preview=True,
    icon="ImageTagIcon",
    icon_class=None,
    slug="image-tags",
    tags=["Images", "Tags"],
    related_components=["ImageTagList", "ImageTagDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a tag that can be associated with images.",
        "fields": {
            "Tag Name": "The name of the tag.",
            "Author": "The author of the tag.",
            "Image Count": "The number of images associated with the tag.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ImageTag model reference": "/docs/imagetag/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
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


@metadata(
    autoform_label="Image Element",
    long_description="This model represents an image that can be added to a page.",
    short_description="Model for page images",
    pages_associated={
        "Images": "/images",
        "Pages": "/pages",
    },
    include_preview=True,
    icon="ImageElementIcon",
    icon_class=None,
    slug="image-elements",
    tags=["Images", "Pages"],
    related_components=["ImageElementList", "ImageElementDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents an image that can be added to a page.",
        "fields": {
            "Image Size": "The size of the image.",
            "Image Placement": "The placement of the image on the page.",
            "Image": "The image file.",
            "Image Caption": "The caption for the image.",
            "Tag": "The tag associated with the image.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ImageElement model reference": "/docs/imageelement/",
        },
    },
    allowed=True,
    filter_options=["type", "justify", "tag__name"],
)
class ImageElement(BaseElement):
    TYPES = (
        ("Small", "Small"),
        ("Medium", "Medium"),
        ("Full", "Full"),
    )
    JUSTIFY_TYPES = (
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
        choices=JUSTIFY_TYPES,
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


@metadata(
    autoform_label="Header Element",
    long_description="This model represents a header element that can be used on pages.",
    short_description="A model for creating headers to be used on pages.",
    pages_associated={
        "Landing": "/",
        "About": "/about",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="header-element",
    tags=["Page Components", "Headers"],
    related_components=["FooterElement"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to create headers to be used on pages. A header can be used to display a title, subtitle, and tagline for a page or section.",
        "fields": {
            "Header Type": "The type of header to be used (H1, H2, H3, etc.).",
            "Header Title": "The title to be displayed in the header.",
            "Header Subtitle": "The subtitle to be displayed in the header (optional).",
            "Tagline": "A tagline to be displayed in the header (optional).",
            "Bottom Divider": "Whether or not a bottom divider should be displayed.",
            "Top Divider": "Whether or not a top divider should be displayed.",
            "Text Alignment": "The alignment of the header text (left, right, center).",
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
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "Header Element"
        verbose_name_plural = "Header Elements"


@metadata(
    autoform_label="Element Set",
    long_description="This model represents a set of elements that can be used to build a page.",
    short_description="Model for element sets",
    pages_associated={
        "Element Sets": "/element-sets",
        "Elements": "/elements",
    },
    include_preview=False,
    icon="ElementSetIcon",
    icon_class=None,
    slug="element-sets",
    tags=["Elements"],
    related_components=["ElementSetList", "ElementSetDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a set of elements that can be used to build a page.",
        "fields": {
            "Name": "The name of the element set.",
            "Description": "An optional description of the element set.",
            "Elements": "The elements included in the set.",
            "Created At": "The date and time the element set was created.",
            "Updated At": "The date and time the element set was last updated.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ElementSet model reference": "/docs/elementset/",
        },
    },
    allowed=True,
    filter_options=["name"],
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
        ordering = ["-id"]
        verbose_name = "Element Set"
        verbose_name_plural = "Element Sets"


@metadata(
    autoform_label="List Item Tag",
    long_description="This model represents a tag that can be associated with list items.",
    short_description="Model for list item tags",
    pages_associated={
        "Lists": "/lists",
        "Tags": "/tags",
    },
    include_preview=True,
    icon="ListItemTagIcon",
    icon_class=None,
    slug="list-item-tags",
    tags=["Lists", "Tags"],
    related_components=["ListItemTagList", "ListItemTagDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a tag that can be associated with list items.",
        "fields": {
            "Tag Name": "The name of the tag.",
            "Author": "The author of the tag.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ListItemTag model reference": "/docs/listitemtag/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
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


@metadata(
    autoform_label="List Element Item",
    long_description="This model represents a list element item that can be associated with a tag and an image.",
    short_description="Model for list element items",
    pages_associated={
        "List Element Items": "/list_element_items",
        "Tags": "/list_item_tags",
    },
    include_preview=True,
    icon="ListElementItemIcon",
    icon_class=None,
    slug="list-element-items",
    tags=["List Element Items", "Tags"],
    related_components=["ListElementItemList", "ListElementItemDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a list element item that can be associated with a tag and an image.",
        "fields": {
            "List Element Item Name": "The name of the list element item.",
            "Tag": "The tag associated with the list element item.",
            "Page Appearance Order": "The order in which the list element item appears on a page.",
            "Primary List Text": "The primary text of the list element item.",
            "Secondary List Text": "The secondary text of the list element item.",
            "List Item Icon": "The icon associated with the list element item.",
            "Image": "The image associated with the list element item.",
            "Author": "The author of the list element item.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ListElementItem model reference": "/docs/listelementitem/",
        },
    },
    allowed=True,
    filter_options=["name", "tag__name"],
)
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


@metadata(
    autoform_label="List Element",
    long_description="This model represents a list element that can contain items of different types.",
    short_description="Model for list elements",
    pages_associated={
        "Elements": "/elements",
        "Lists": "/lists",
    },
    include_preview=True,
    icon="ListElementIcon",
    icon_class=None,
    slug="list-elements",
    tags=["Elements", "Lists"],
    related_components=["ListElementList", "ListElementDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a list element that can contain items of different types.",
        "fields": {
            "List Type": "The type of list element.",
            "Items": "The items that belong to the list element.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "ListElement model reference": "/docs/listelement/",
        },
    },
    allowed=True,
    filter_options=["type"],
)
class ListElement(BaseElement):
    TYPES = (
        ("Unordered", "Unordered"),
        ("Ordered", "Ordered"),
        ("Icon", "Icon"),
        ("Image", "Image"),
    )

    type = CustomCharField(
        max_length=10,
        verbose_name="List Type",
        help_text="List Type",
        md_column_count=6,
        choices=TYPES,
        default="Unordered",
    )
    items = models.ManyToManyField(ListElementItem)

    class Meta:
        ordering = ["-id"]
        verbose_name = "List Element"
        verbose_name_plural = "List Elements"


@metadata(
    autoform_label="Card Element",
    long_description="This model represents a card element that can be used to display information in a card-like format.",
    short_description="Model for card elements",
    pages_associated={
        "Cards": "/cards",
        "Elements": "/elements",
    },
    include_preview=True,
    icon="CardIcon",
    icon_class=None,
    slug="card-elements",
    tags=["Cards", "Elements"],
    related_components=["CardList", "CardDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a card element that can be used to display information in a card-like format.",
        "fields": {
            "Card Size Type": "The size type of the card.",
            "Card Icon": "The icon of the card.",
            "Card Image (Optional)": "The image of the card, if any.",
            "Card Header Text (Optional)": "The header text of the card, if any.",
            "Card Subheader Text (Optional)": "The subheader text of the card, if any.",
            "Primary Card Text": "The primary text of the card.",
            "Secondary Card Text (Optional)": "The secondary text of the card, if any.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "CardElement model reference": "/docs/cardelement/",
        },
    },
    allowed=True,
    filter_options=["type", "header"],
)
class CardElement(BaseElement):
    TYPES = (
        ("Small", "Small"),
        ("Medium", "Medium"),
        ("Large", "Large"),
    )
    type = CustomCharField(
        max_length=10,
        verbose_name="Card Size Type",
        help_text="Card Size Type",
        md_column_count=6,
        choices=TYPES,
        default="Unordered",
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

    class Meta:
        ordering = ["-id"]
        verbose_name = "Card Element"
        verbose_name_plural = "Card Elements"
