from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class HeroBlock(models.Model):
    title = models.CharField(max_length=200)
    heading = models.TextField()
    text = models.TextField()
    buttonText = models.CharField(max_length=50)


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


class Item(models.Model):
    image = models.ImageField(upload_to="carousel")
    buttonText = models.CharField(max_length=20)
    buttonLink = models.CharField(max_length=20)


class Feature(models.Model):
    detail = models.CharField(max_length=100)

    def __str__(self):
        return self.detail


class SupportedSites(models.Model):
    site = models.CharField(max_length=100)

    def __str__(self):
        return self.site


class PricingPlan(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="pricing_images")
    features = models.ManyToManyField(Feature, related_name="features")
    supportedsites = models.ManyToManyField(
        SupportedSites, related_name="supportedsites"
    )
    bestFor = models.CharField(max_length=100, default="Tits")
    guarantee = models.CharField(max_length=100, default="Tits")

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        self.features.all().delete()
        self.supportedsites.all().delete()
        super().delete(*args, **kwargs)


class Testimonial(models.Model):
    heading = models.CharField(max_length=100)
    text = models.CharField(max_length=200)
    image = models.ImageField(upload_to="testimonial_images")
    name = models.CharField(max_length=40)
    position = models.CharField(max_length=40)


class Tile(models.Model):
    title = models.CharField(max_length=100)
    subheader = models.CharField(max_length=200)
    icon = models.CharField(max_length=40)


class Process(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=40)


@receiver(pre_save, sender=TitleBlock)
def lowercase_name(sender, instance, **kwargs):
    instance.name = instance.name.lower()
