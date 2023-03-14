from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from api.customs import *


class CustomUserManager(UserManager):
    def create_user_with_settings(
        self,
        username,
        email,
        password,
        first_name,
        last_name,
        phone_number,
        address,
        city,
        state,
        zip_code,
        country,
        salt,
    ):
        user = self.create_user(
            username,
            email,
            password,
        )
        user.first_name = first_name
        user.last_name = last_name
        user.phone_number = phone_number
        user.address = address
        user.city = city
        user.state = state
        user.zip_code = zip_code
        user.country = country
        user.salt = salt
        user.save()

        theme_settings = ThemeSettings.objects.create(
            user=user,
            primary_color="#2e3b55",
            secondary_color="#ff8c00",
            background_color="#F5F5F5",
        )
        theme_settings.save()

        return user


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    salt = models.CharField(max_length=255, null=True)

    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)

    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class ThemeSettings(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="theme_settings"
    )
    primary_color = models.CharField(max_length=7)
    secondary_color = models.CharField(max_length=7)
    background_color = models.CharField(max_length=7)


class TokenBlacklist(models.Model):
    token = models.CharField(max_length=255, unique=True)
    blacklisted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
