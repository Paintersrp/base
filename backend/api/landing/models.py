from django.db import models


class HeroBlock(models.Model):
    title = models.CharField(max_length=200)
    heading = models.TextField()
    text = models.TextField()
    buttonText = models.CharField(max_length=50)


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


class Tile(models.Model):
    title = models.CharField(max_length=100)
    subheader = models.CharField(max_length=200)
    icon = models.CharField(max_length=40)
