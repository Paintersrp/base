from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Hero Section",
    long_description="This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
    short_description="A model for creating hero sections.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="hero",
    tags=["Landing", "Hero", "Company"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a hero section, which is typically the top section of a webpage and contains a prominent headline, subheading, and background image.",
        "fields": {
            "Header": "The title of the hero section.",
            "Subheader": "The subtitle of the hero section.",
            "Description": "The description of the hero section.",
            "Button Text": "The text that will appear on the hero section's button.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "HeroBlock model reference": "/docs/model/heroblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class HeroBlock(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )

    heading = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Subtitle",
        help_text="Subheader",
        min_rows=3,
    )
    text = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    buttonText = CustomCharField(
        max_length=50,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Button Text",
    )

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Section Heading",
    long_description="A section heading with a title, subtitle, and description to be used as a heading for various content sections.",
    short_description="Section Heading",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="TitleIcon",
    icon_class=None,
    slug="section-title",
    tags=["About", "Title", "Content", "Company"],
    related_components=["TitleBlock"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a section heading with a title, subtitle, and description to be used as a heading for various content sections.",
        "fields": {
            "Name": "A unique name for the section heading.",
            "Header Text": "The main heading text of the section heading.",
            "Subheader Text": "The subheading text of the section heading.",
            "Description": "A brief description of the section heading.",
            "Alignment": "The alignment of the section heading (left, right, or center).",
            "Show Divider": "Whether to show a divider line under the section heading or not.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "TitleBlock model reference": "/docs/model/titleblock/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
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
        md_column_count=12,
        verbose_name="Section Name",
        help_text="Referential Name",
    )

    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )

    subtitle = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Subheader",
        help_text="Subheader Text",
    )

    description = CustomTextField(
        max_length=250,
        null=True,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description Text",
        min_rows=3,
    )

    alignment = CustomCharField(
        max_length=10,
        choices=ALIGNMENT_CHOICES,
        md_column_count=12,
        verbose_name="Text Alignment",
        help_text="Text Alignment",
    )

    show_divider = models.BooleanField(
        default=False,
        verbose_name="Bottom Divider",
        help_text="Optional Divider Below Section Header",
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
    visibility=False,
    access_level="All",
    info_dump={"text": ""},
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
    autoform_label="Service Tier Feature",
    long_description="This model holds a list of features offered by a Service/Service Tier",
    short_description="Features offered by a Service/Service Tier",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=False,
    icon="StarIcon",
    icon_class=None,
    slug="service-feature",
    tags=["Feature", "Service", "Tier"],
    related_components=["Pricing"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the features offered by a Service or Service Tier. Each instance of this model contains information about a single feature.",
        "fields": {
            "Detail": "A short description of the feature.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Feature model reference": "/docs/model/feature/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class Feature(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Feature Detail",
        help_text="Feature Detail",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Feature"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Service Tier Supported Site",
    long_description="This model holds a list of supported sites offered by a Service/Service Tier",
    short_description="Site types supported by a Service/Service Tier",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=False,
    icon="WebIcon",
    icon_class=None,
    slug="service-supported-site",
    tags=["Feature", "Service", "Tier"],
    related_components=["Pricing"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model holds a list of supported sites offered by a Service/Service Tier.",
        "fields": {
            "Detail": "The name of the supported site.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "SupportedSites model reference": "/docs/model/supportedsites/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class SupportedSites(models.Model):
    detail = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Supported Site Detail",
        help_text="Supported Site Detail",
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Supported Sites"
        verbose_name_plural = "Supported Sites"


@custom_metadata(
    autoform_label="Service Tier",
    long_description="This model represents the different service tiers available.",
    short_description="Service Tier Model",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="DesignServicesIcon",
    icon_class=None,
    slug="service-tier",
    tags=["Pricing", "Service", "Tier"],
    related_components=["Pricing", "ServiceIndividual"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model defines the different service tiers that are available in our system, including the pricing, features, and supported sites for each tier.",
        "fields": {
            "Image": "The image associated with the service tier.",
            "Service Title": "The title of the service tier.",
            "Price": "The price of the service tier.",
            "Paragraph One": "The first paragraph of the service tier description.",
            "Paragraph Two": "The second paragraph of the service tier description.",
            "Paragraph Three": "The third paragraph of the service tier description.",
            "Features": "The features included in the service tier.",
            "Supported Sites": "The sites that are supported by the service tier.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTier model reference": "/docs/model/servicetier/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class ServiceTier(models.Model):
    image = models.ImageField(
        upload_to="pricing_images",
        verbose_name="Image",
        help_text="Image",
    )
    service_title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Service Title",
        help_text="Service Tier Title",
    )
    price = CustomDecimalField(
        max_digits=10,
        decimal_places=2,
        md_column_count=6,
        verbose_name="Price",
        help_text="Service Tier Price",
    )

    features = CustomManyToManyField(
        Feature,
        related_name="features",
        verbose_name="Features",
        md_column_count=6,
        help_text="Service Tier Features",
    )

    supported_sites = CustomManyToManyField(
        SupportedSites,
        related_name="supportedsites",
        verbose_name="Supported Sites",
        md_column_count=6,
        help_text="Service Tier Supported Sites",
    )
    paragraph_one = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph One",
        help_text="Paragraph One",
    )
    paragraph_two = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph Two",
        help_text="Paragraph Two",
    )
    paragraph_three = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Paragraph Three",
        help_text="Paragraph Three",
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
    visibility=False,
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
    autoform_label="Process Step",
    long_description="This model represents a collection of steps that describe the process of how the business works. Each step includes a title, description, and an icon to illustrate the step.",
    short_description="Model for company process steps",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="AccountTreeIcon",
    icon_class=None,
    slug="header",
    tags=["Landing" "Process", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a collection of steps that describe the process of how the business works.",
        "fields": {
            "Header": "The title of the process step",
            "Description": "A brief description of the process step",
            "Icon": "The icon that represents the process step",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Process model reference": "/docs/model/process/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
)
class Process(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=200,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )

    class Meta:
        verbose_name = "Processes"
        verbose_name_plural = "Processes"


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
