from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class HeroBlock(models.Model):
    title = models.CharField(max_length=200)
    heading = models.TextField()
    text = models.TextField()
    buttonText = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = verbose_name + "s"


class TitleBlock(models.Model):
    ALIGNMENT_CHOICES = (
        ("Left", "Left"),
        ("Right", "Right"),
        ("Center", "Center"),
    )

    name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100)
    description = models.CharField(max_length=250, null=True)
    alignment = models.CharField(max_length=10, choices=ALIGNMENT_CHOICES)
    show_divider = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Heading Blocks"
        verbose_name_plural = "Heading Blocks"


class Item(models.Model):
    image = models.ImageField(upload_to="carousel")
    buttonText = models.CharField(max_length=20)
    buttonLink = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = verbose_name + "s"


class Feature(models.Model):
    detail = models.CharField(max_length=100)

    def __str__(self):
        return self.detail

    class Meta:
        verbose_name = "Feature"
        verbose_name_plural = verbose_name + "s"


class SupportedSites(models.Model):
    site = models.CharField(max_length=100)

    def __str__(self):
        return self.site

    class Meta:
        verbose_name = "SupportedSites"
        verbose_name_plural = "SupportedSites"


class PricingPlan(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="pricing_images")
    features = models.ManyToManyField(Feature, related_name="features")
    supported_sites = models.ManyToManyField(
        SupportedSites, related_name="supportedsites"
    )
    bestFor = models.CharField(max_length=100, default="Tits")
    guarantee = models.CharField(max_length=100, default="Tits")

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        self.features.all().delete()
        self.supported_sites.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Pricing Tiers"
        verbose_name_plural = "Pricing Tiers"


class Testimonial(models.Model):
    heading = models.CharField(max_length=100)
    text = models.CharField(max_length=200)
    image = models.ImageField(upload_to="testimonial_images")
    name = models.CharField(max_length=40)
    position = models.CharField(max_length=40)

    class Meta:
        verbose_name = "Testimonials"
        verbose_name_plural = "Testimonials"

class Process(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=40)

    class Meta:
        verbose_name = "Processes"
        verbose_name_plural = "Processes"


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
