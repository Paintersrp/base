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
    username = CustomCharField(
        max_length=255, unique=True, md_column_count=6, verbose_name="Username"
    )
    email = CustomEmailField(unique=True, md_column_count=6, verbose_name="Email")
    first_name = CustomCharField(
        max_length=255, md_column_count=6, verbose_name="First Name"
    )
    last_name = CustomCharField(
        max_length=255, md_column_count=6, verbose_name="Last Name"
    )

    password = CustomCharField(
        max_length=255, md_column_count=6, verbose_name="Password"
    )
    salt = CustomCharField(
        max_length=255, null=True, md_column_count=6, verbose_name="Salt"
    )
    phone_number = CustomCharField(
        max_length=20, blank=True, md_column_count=6, verbose_name="Phone Number"
    )
    address = CustomCharField(
        max_length=255, blank=True, md_column_count=6, verbose_name="Address"
    )
    city = CustomCharField(
        max_length=100, blank=True, md_column_count=6, verbose_name="City"
    )
    state = CustomCharField(
        max_length=100, blank=True, md_column_count=6, verbose_name="State"
    )
    zip_code = CustomCharField(
        max_length=20, blank=True, md_column_count=6, verbose_name="Zipcode"
    )
    country = CustomCharField(
        max_length=100, blank=True, md_column_count=6, verbose_name="Country"
    )

    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class ThemeSettings(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="theme_settings",
        verbose_name="User",
    )
    primary_color = CustomCharField(
        max_length=7, md_column_count=4, verbose_name="Primary"
    )

    secondary_color = CustomCharField(
        max_length=7, md_column_count=4, verbose_name="Secondary"
    )
    background_color = CustomCharField(
        max_length=7, md_column_count=4, verbose_name="Background"
    )

    class Meta:
        verbose_name = "Theme Settings"
        verbose_name_plural = "Theme Settings"


class TokenBlacklist(models.Model):
    token = CustomTextField(
        max_length=500, unique=True, md_column_count=12, verbose_name="Token"
    )
    blacklisted_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Blacklisted At"
    )

    def __str__(self):
        return self.token

    class Meta:
        verbose_name = "Token Blacklist"
        verbose_name_plural = "Token Blacklist"
