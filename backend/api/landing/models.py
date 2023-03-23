from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Hero Text Block",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class HeroBlock(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=6,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    buttonText = CustomCharField(
        max_length=50,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Help Text Placeholder",
    )
    heading = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Tagline",
        help_text="Help Text Placeholder",
    )
    text = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="TitleBlock",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="TitleIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class TitleBlock(models.Model):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=8,
        verbose_name="Section Name",
        help_text="Help Text Placeholder",
    )

    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )

    subtitle = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Subtitle",
        help_text="Help Text Placeholder",
    )

    description = CustomTextField(
        max_length=250,
        null=True,
        md_column_count=12,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )

    alignment = CustomCharField(
        max_length=10,
        choices=ALIGNMENT_CHOICES,
        md_column_count=12,
        verbose_name="Alignment",
    )

    show_divider = models.BooleanField(
        default=False,
        verbose_name="Show Divider?",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Section Headings"
        verbose_name_plural = "Section Headings"


@custom_metadata(
    autoform_label="Hero Text Block",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="TurnedInIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class Item(models.Model):
    image = models.ImageField(upload_to="carousel", verbose_name="Image")
    buttonText = CustomCharField(
        max_length=20, md_column_count=6, verbose_name="Button Text"
    )
    buttonLink = CustomCharField(
        max_length=20, md_column_count=6, verbose_name="Button Link"
    )

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Service Tier Features",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=False,
    icon="StarIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class Feature(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Feature Detail",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Feature"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Service Tier Supported Sites",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=False,
    icon="WebIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class SupportedSites(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Supported Site Detail",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Supported Sites"
        verbose_name_plural = "Supported Sites"


@custom_metadata(
    autoform_label="Service Tiers",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="DesignServicesIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class ServiceTier(models.Model):
    image = models.ImageField(
        upload_to="pricing_images",
        verbose_name="Image",
        help_text="Help Text Placeholder",
    )
    service_title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Service Title",
        help_text="Help Text Placeholder",
    )
    price = CustomDecimalField(
        max_digits=10,
        decimal_places=2,
        md_column_count=6,
        verbose_name="Price",
        help_text="Help Text Placeholder",
    )

    features = CustomManyToManyField(
        Feature,
        related_name="features",
        verbose_name="Features",
        md_column_count=6,
        help_text="Help Text Placeholder",
    )

    supported_sites = CustomManyToManyField(
        SupportedSites,
        related_name="supportedsites",
        verbose_name="Supported Sites",
        md_column_count=6,
        help_text="Help Text Placeholder",
    )
    paragraph_one = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph 1",
        help_text="Help Text Placeholder",
    )
    paragraph_two = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph 2",
        help_text="Help Text Placeholder",
    )
    paragraph_three = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph 3",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.service_title

    def delete(self, *args, **kwargs):
        self.features.all().delete()
        self.supported_sites.all().delete()
        super().delete(*args, **kwargs)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.features.xs_column_count = 12
        self.features.md_column_count = 8

    class Meta:
        verbose_name = "Service Tiers"
        verbose_name_plural = "Service Tiers"


@custom_metadata(
    autoform_label="Hero Text Block",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="ReviewsIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class Testimonial(models.Model):
    heading = CustomCharField(max_length=100, md_column_count=4, verbose_name="Heading")
    image = models.ImageField(upload_to="testimonial_images", verbose_name="Image")
    name = CustomCharField(max_length=40, md_column_count=4, verbose_name="Name")
    position = CustomCharField(
        max_length=40, md_column_count=4, verbose_name="Position"
    )
    text = CustomTextField(max_length=200, md_column_count=10, verbose_name="Quote")

    class Meta:
        verbose_name = "Testimonials"
        verbose_name_plural = "Testimonials"


@custom_metadata(
    autoform_label="Process Steps",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="AccountTreeIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
)
class Process(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=8,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    description = CustomTextField(
        max_length=200,
        md_column_count=12,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Processes"
        verbose_name_plural = "Processes"


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
