from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from api.customs import *
from auditlog.registry import auditlog
from contact.models import ContactInformation, Socials
from articles.models import Articles
from .metadata import *


@metadata(**HERO_BLOCK_METADATA)
class HeroBlock(models.Model):
    name = CustomCharField(
        max_length=100,
        unique=True,
        md_column_count=12,
        verbose_name="Hero Block Name",
        help_text="Referential Name",
        db_index=True,
    )
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

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Hero Section"
        verbose_name_plural = verbose_name + "s"


@metadata(**TITLE_BLOCK_METADATA)
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
        db_index=True,
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

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Section Headings"
        verbose_name_plural = "Section Headings"


@metadata(**FEATURE_METADATA)
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


@metadata(**SUPPORTED_SITES_METADATA)
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


@metadata(**SERVICE_TIER_METADATA)
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
        db_index=True,
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
        ordering = ["price"]
        verbose_name = "Service Tiers"
        verbose_name_plural = "Service Tiers"


@metadata(**PROCESS_METADATA)
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

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]
        verbose_name = "Process Item"
        verbose_name_plural = "Process Items"


@metadata(**HERO_METADATA)
class Hero(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Hero Name",
        help_text="Hero Name",
        default="Placeholder",
        db_index=True,
    )
    contact = models.ForeignKey(
        ContactInformation,
        on_delete=models.CASCADE,
        verbose_name="Contact Information",
    )
    social = models.ForeignKey(
        Socials,
        on_delete=models.CASCADE,
        verbose_name="Socials",
    )
    hero_block = models.ForeignKey(
        HeroBlock,
        on_delete=models.CASCADE,
        verbose_name="Attached Hero Block Data",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Hero"
        verbose_name_plural = "Heros"


@metadata(**PROCESSES_METADATA)
class Processes(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Hero Name",
        help_text="Hero Name",
        default="Placeholder",
        db_index=True,
    )
    processes = models.ManyToManyField(Process)
    title_block = models.ForeignKey(
        TitleBlock,
        on_delete=models.CASCADE,
        limit_choices_to={"name": "process"},
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Process Component Set"
        verbose_name_plural = "Process Component Sets"


# Control Added Later?
@metadata(**LATEST_NEWS_METADATA)
class LatestNews(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Latest News Slug",
        help_text="Latest News Slug",
        default="Placeholder",
    )
    latest_articles = models.ManyToManyField(
        Articles,
        related_name="latest_articles_highlighted_objects",
    )
    title_block = models.ForeignKey(
        TitleBlock,
        on_delete=models.CASCADE,
        limit_choices_to={"name": "news"},
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Latest News"
        verbose_name_plural = "Latest News"


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
