from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class ThemeSettings(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="theme_settings"
    )
    primary_color = models.CharField(max_length=7)
    secondary_color = models.CharField(max_length=7)
    background_color = models.CharField(max_length=7)
