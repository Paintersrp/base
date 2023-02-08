from django.db import models


class AboutBlock(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="about")


class MissionStatement(models.Model):
    title = models.CharField(max_length=200)
    body1 = models.CharField(max_length=1000, null=True)
    body2 = models.CharField(max_length=1000, null=True)
    body3 = models.CharField(max_length=1000, null=True)


class CompanyHistory(models.Model):
    title = models.CharField(max_length=200)
    body1 = models.CharField(max_length=1000, null=True)
    body2 = models.CharField(max_length=1000, null=True)
    body3 = models.CharField(max_length=1000, null=True)


class Value(models.Model):
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=40)
