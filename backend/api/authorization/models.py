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


@metadata(
    autoform_label="User",
    long_description="This model represents a user account in our system.",
    short_description="User Account",
    include_preview=False,
    icon="AccountCircleIcon",
    icon_class=None,
    slug="users",
    tags=["User", "Profile"],
    related_components=[""],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a user account in our system. It stores information about the user such as their username, email address, and contact information.",
        "fields": {
            "Username": "The username chosen by the user when they created their account.",
            "Email": "The email address associated with the user's account.",
            "First Name": "The user's first name.",
            "Last Name": "The user's last name.",
            # "Password": "The password chosen by the user when they created their account.",
            # "Salt": "A salt value used for password hashing.",
            "Phone Number": "The user's phone number.",
            "Address": "The user's street address.",
            "City": "The user's city of residence.",
            "State": "The user's state of residence.",
            "Zip Code": "The user's ZIP code.",
            "Country": "The user's country of residence.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "User model reference": "/docs/model/user/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    allowed=False,
)
class User(AbstractUser):
    username = CustomCharField(
        max_length=255,
        unique=True,
        md_column_count=6,
        verbose_name="Username",
        help_text="Username",
        db_index=True,
    )
    email = CustomEmailField(
        unique=True,
        md_column_count=6,
        verbose_name="Email",
        help_text="Email Address",
    )
    first_name = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="First Name",
        help_text="First Name",
    )
    last_name = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Last Name",
        help_text="Last Name",
    )

    password = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Password",
        help_text="",
    )
    salt = CustomCharField(
        max_length=255,
        null=True,
        md_column_count=6,
        verbose_name="Salt",
        help_text="",
    )
    phone_number = CustomCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Phone Number",
        help_text="Phone Number",
    )
    address = CustomCharField(
        max_length=255,
        blank=True,
        md_column_count=6,
        verbose_name="Address",
        help_text="Address",
    )
    city = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="City",
        help_text="City",
    )
    state = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="State",
        help_text="State",
    )
    zip_code = CustomCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Zipcode",
        help_text="Zip Code",
    )
    country = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="Country",
        help_text="Country",
    )

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


@metadata(
    autoform_label="Theme User Setting",
    long_description="This model represents the theme settings for a user. Users can customize their primary, secondary, and background colors to personalize their experience.",
    short_description="Model for managing user theme settings.",
    include_preview=False,
    icon="DisplaySettingsIcon",
    icon_class=None,
    slug="theme-settings",
    tags=["Theme", "User"],
    related_components=["ThemeSettings"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model stores the custom theme settings for each user in the application.",
        "fields": {
            "User": "The user associated with the theme settings.",
            "Primary Color": "The primary color chosen by the user.",
            "Secondary Color": "The secondary color chosen by the user.",
            "Background Color": "The background color chosen by the user.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ThemeSettings model reference": "/docs/model/themesettings/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    allowed=False,
)
class ThemeSettings(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="theme_settings",
        verbose_name="User",
        help_text="Help Text Placeholder",
        db_index=True,
    )
    primary_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Primary",
        help_text="Primary Color (Hex or RGBa)",
    )

    secondary_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Secondary",
        help_text="Secondary Color (Hex or RGBa)",
    )
    background_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Background",
        help_text="Background Color (Hex or RGBa)",
    )

    class Meta:
        verbose_name = "Theme Settings"
        verbose_name_plural = "Theme Settings"


@metadata(
    autoform_label="Manage JWT Token Blacklist",
    long_description="This model represents a JWT token blacklist that is used to keep track of blacklisted tokens in the system. Whenever a token is blacklisted, a record is created in this model with the token and the time it was blacklisted. This model can be used to manage and monitor the blacklisted tokens.",
    short_description="A model for managing JWT token blacklist",
    include_preview=False,
    icon="AppBlockingIcon",
    icon_class=None,
    slug="token-blacklist",
    tags=["Authentication", "JWT", "Security"],
    related_components=["TokenBlacklist,TokenAuthentication"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to manage and monitor JWT token blacklist.",
        "fields": {
            "Token": "The JWT token that has been blacklisted.",
            "Blacklisted At (auto-generated)": "The time at which the token was blacklisted.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "TokenBlacklist model reference": "/docs/model/tokenblacklist/",
            "Authorization app documentation": "/docs/app/authorization/",
        },
    },
    allowed=False,
)
class TokenBlacklist(models.Model):
    token = CustomTextField(
        max_length=500,
        unique=True,
        md_column_count=12,
        verbose_name="Token",
        help_text="Token",
    )
    blacklisted_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Blacklisted At",
        help_text="",
    )

    def __str__(self):
        return self.token

    class Meta:
        verbose_name = "Token Blacklist"
        verbose_name_plural = "Token Blacklist"
