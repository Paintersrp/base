from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from api.customs import (
    CustomCharField,
    CustomTextField,
    CustomDecimalField,
)
from auditlog.registry import auditlog


class HeroBlock(models.Model):
    title = CustomCharField(max_length=200, md_column_count=6, verbose_name="Title")
    heading = CustomTextField(max_length=500, md_column_count=6, verbose_name="Tagline")
    text = CustomTextField(
        max_length=500, md_column_count=6, verbose_name="Description"
    )
    buttonText = CustomCharField(
        max_length=50, md_column_count=6, verbose_name="Button Text"
    )

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = verbose_name + "s"


class TitleBlock(models.Model):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    name = CustomCharField(
        max_length=100, unique=True, md_column_count=8, verbose_name="Section Name"
    )
    title = CustomCharField(max_length=100, md_column_count=6, verbose_name="Title")
    subtitle = CustomCharField(
        max_length=100, md_column_count=6, verbose_name="Subtitle"
    )
    description = CustomTextField(
        max_length=250, null=True, md_column_count=12, verbose_name="Description"
    )
    alignment = CustomCharField(
        max_length=10,
        choices=ALIGNMENT_CHOICES,
        md_column_count=12,
        verbose_name="Alignment",
    )
    show_divider = models.BooleanField(default=False, verbose_name="Show Divider?")

    class Meta:
        verbose_name = "Section Headings"
        verbose_name_plural = "Section Headings"


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


class Feature(models.Model):
    detail = CustomCharField(
        max_length=100, md_column_count=6, verbose_name="Feature Detail"
    )

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Feature"
        verbose_name_plural = verbose_name + "s"


class SupportedSites(models.Model):
    detail = CustomCharField(max_length=100)

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "SupportedSites"
        verbose_name_plural = "SupportedSites"


class ServiceTier(models.Model):
    service_title = CustomCharField(
        max_length=100, md_column_count=6, verbose_name="Service Title"
    )
    price = CustomDecimalField(
        max_digits=10, decimal_places=2, md_column_count=6, verbose_name="Price"
    )
    image = models.ImageField(upload_to="pricing_images", verbose_name="Image")
    features = models.ManyToManyField(
        Feature, related_name="features", verbose_name="Features"
    )
    supported_sites = models.ManyToManyField(
        SupportedSites, related_name="supportedsites", verbose_name="Supported Sites"
    )
    paragraph_one = CustomTextField(
        max_length=500, md_column_count=12, verbose_name="Paragraph 1"
    )
    paragraph_two = CustomTextField(
        max_length=500, md_column_count=12, verbose_name="Paragraph 2"
    )
    paragraph_three = CustomTextField(
        max_length=500, md_column_count=12, verbose_name="Paragraph 3"
    )

    def __str__(self):
        return self.service_title

    def delete(self, *args, **kwargs):
        self.features.all().delete()
        self.supported_sites.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Service Tiers"
        verbose_name_plural = "Service Tiers"


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


class Process(models.Model):
    title = CustomCharField(max_length=100, md_column_count=8, verbose_name="Title")
    description = CustomTextField(
        max_length=200, md_column_count=12, verbose_name="Description"
    )
    icon = CustomCharField(max_length=40, md_column_count=12, verbose_name="Icon")

    class Meta:
        verbose_name = "Processes"
        verbose_name_plural = "Processes"


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()


auditlog.register(Process)
auditlog.register(HeroBlock)
auditlog.register(Testimonial)
auditlog.register(ServiceTier)
auditlog.register(TitleBlock)
auditlog.register(Item)
auditlog.register(Feature)
auditlog.register(SupportedSites)
