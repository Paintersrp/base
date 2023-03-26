from django.db import models
from landing.models import ServiceTier
from api.customs import *
from .models import *


@custom_metadata(
    autoform_label="Benefit",
    long_description="This model represents the benefits offered by your company to your customers. Each benefit has a header, description, icon, button text, and a link to a page.",
    short_description="Model for benefits offered by our company",
    pages_associated={
        "Services": "/services",
    },
    include_preview=True,
    icon="ViewListIcon",
    icon_class=None,
    slug="service-benefits",
    tags=["Benefits", "Services", "Company"],
    related_components=["Benefits", "Benefit"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the benefits offered by your company to your customers for a particular service tier.",
        "fields": {
            "Icon": "The name of the icon used to represent the benefit",
            "Header Text": "The header text of the benefit",
            "Page Link": "The page link to the content represented by the benefit",
            "Content Text": "A brief description of the benefit",
            "Button Text": "The text to display on the button that links to the benefit page",
        },
        "model_links": {
            "Creating a Benefits object": "https://docs.example.com/create-benefits-object",
            "Updating a Benefits object": "https://docs.example.com/update-benefits-object",
            "Deleting a Benefits object": "https://docs.example.com/delete-benefits-object",
        },
    },
)
class Benefits(BaseModel):
    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )
    description = CustomTextField(
        max_length=250,
        verbose_name="Description",
        md_column_count=12,
        help_text="Content Text",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )
    buttonText = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Button Text",
    )
    page_link = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Link",
        help_text="Page Link",
        default="about",
    )

    class Meta:
        verbose_name = "Benefits"
        verbose_name_plural = "Benefits"


@custom_metadata(
    autoform_label="Process Image Item",
    long_description="This model represents an image used in the process of providing our services. Each image is associated with a service tier.",
    short_description="A model for process images",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="ImageIcon",
    icon_class=None,
    slug="process-image-item",
    tags=["Service", "Image"],
    related_components=["ProcessImage"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents an image used in the process of providing our services, and is associated with a specific service tier.",
        "fields": {
            "Image": "The image file.",
            "Service Tier": "The service tier that this image is associated with.",
        },
        "model_links": {
            "Creating a ProcessImageItem object": "https://docs.example.com/create-processimageitem-object",
            "Updating a ProcessImageItem object": "https://docs.example.com/update-processimageitem-object",
            "Deleting a ProcessImageItem object": "https://docs.example.com/delete-processimageitem-object",
        },
    },
)
class ProcessImageItem(models.Model):
    image = models.ImageField(upload_to="process_images", verbose_name="Image")
    servicetier = models.ForeignKey(
        ServiceTier,
        on_delete=models.CASCADE,
        related_name="servicetier",
        null=True,
        verbose_name="Service Tier",
        help_text="Service Tier Link",
    )

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


@custom_metadata(
    autoform_label="Process Text Item",
    long_description="This model represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
    short_description="A text item in a process or workflow.",
    pages_associated={
        "Services": "/services",
    },
    include_preview=True,
    icon="Description",
    icon_class=None,
    slug="process-text-item",
    tags=["Service", "Text"],
    related_components=["ProcessText"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "Represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
        "fields": {
            "Title": "The title of the text item. Limited to 100 characters.",
            "Description": "The description of the text item. Limited to 500 characters.",
            "Icon": "The icon associated with the text item. Limited to 40 characters.",
        },
        "model_links": {
            "Creating a ProcessTextItem object": "https://docs.example.com/create-processtextitem-object",
            "Updating a ProcessTextItem object": "https://docs.example.com/update-processtextitem-object",
            "Deleting a ProcessTextItem object": "https://docs.example.com/delete-processtextitem-object",
        },
    },
)
class ProcessTextItem(models.Model):
    title = CustomCharField(
        max_length=100,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )

    class Meta:
        verbose_name = "Process Text Item"
        verbose_name_plural = "Process Text Items"
