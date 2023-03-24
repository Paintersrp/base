from django.db import models
from landing.models import ServiceTier
from api.customs import *


@custom_metadata(
    autoform_label="Benefit Object",
    long_description="This model represents the benefits offered by our company to our customers. Each benefit has a title, description, icon, button text, and a link to a page.",
    short_description="Model for benefits offered by our company",
    pages_associated={
        "Services": "/services",
    },
    include_preview=True,
    icon="ViewListIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Benefits(BaseModel):
    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    description = CustomTextField(
        max_length=250,
        verbose_name="Description",
        md_column_count=12,
        help_text="Help Text Placeholder",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Help Text Placeholder",
    )
    buttonText = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Help Text Placeholder",
    )
    page_link = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Page Link",
        help_text="Help Text Placeholder",
        default="about",
    )

    class Meta:
        verbose_name = "Benefits"
        verbose_name_plural = "Benefits"


@custom_metadata(
    autoform_label="Process Image Item Object",
    long_description="This model represents an image used in the process of providing our services. Each image is associated with a service tier.",
    short_description="A model for process images",
    pages_associated={
        "Services": "/services",
    },
    include_preview=True,
    icon="ImageIcon",
    icon_class=None,
    slug="process-image-item",
    tags=["Service", "Image"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class ProcessImageItem(models.Model):
    image = models.ImageField(upload_to="process_images", verbose_name="Image")
    servicetier = models.ForeignKey(
        ServiceTier,
        on_delete=models.CASCADE,
        related_name="servicetier",
        null=True,
        verbose_name="Service Tier",
    )

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


@custom_metadata(
    autoform_label="Process Text Item Object",
    long_description="This model represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
    short_description="A text item in a process or workflow.",
    pages_associated={
        "Services": "/services",
    },
    include_preview=True,
    icon="Description",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class ProcessTextItem(models.Model):
    title = CustomCharField(
        max_length=100,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )
    icon = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Process Text Item"
        verbose_name_plural = "Process Text Items"
