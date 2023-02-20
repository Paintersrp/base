from django.db import models


class Benefit(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    icon = models.CharField(max_length=40)
    buttonText = models.CharField(max_length=40)
