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


@custom_metadata(
    autoform_label="Manage User Object",
    long_description="This model represents a user account in our system.",
    short_description="User Account",
    include_preview=False,
    icon="AccountCircleIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
   info_dump={
        "purpose": "This model represents a user account in our system. It stores information about the user such as their username, email address, and contact information.",
        "fields": {
            "username": "The username chosen by the user when they created their account.",
            "email": "The email address associated with the user's account.",
            "first_name": "The user's first name.",
            "last_name": "The user's last name.",
            "password": "The password chosen by the user when they created their account.",
            "salt": "A salt value used for password hashing.",
            "phone_number": "The user's phone number.",
            "address": "The user's street address.",
            "city": "The user's city of residence.",
            "state": "The user's state of residence.",
            "zip_code": "The user's ZIP code.",
            "country": "The user's country of residence."
        },
        "model_links": {
            "User Group": "/user-group/",
            "Activity Log": "/activity-log/",
            "Billing Info": "/billing-info/"
        }
    }
)
class User(AbstractUser):
    username = CustomCharField(
        max_length=255,
        unique=True,
        md_column_count=6,
        verbose_name="Username",
        help_text="Help Text Placeholder",
    )
    email = CustomEmailField(
        unique=True,
        md_column_count=6,
        verbose_name="Email",
        help_text="Help Text Placeholder",
    )
    first_name = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="First Name",
        help_text="Help Text Placeholder",
    )
    last_name = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Last Name",
        help_text="Help Text Placeholder",
    )

    password = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Password",
        help_text="Help Text Placeholder",
    )
    salt = CustomCharField(
        max_length=255,
        null=True,
        md_column_count=6,
        verbose_name="Salt",
        help_text="Help Text Placeholder",
    )
    phone_number = CustomCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Phone Number",
        help_text="Help Text Placeholder",
    )
    address = CustomCharField(
        max_length=255,
        blank=True,
        md_column_count=6,
        verbose_name="Address",
        help_text="Help Text Placeholder",
    )
    city = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="City",
        help_text="Help Text Placeholder",
    )
    state = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="State",
        help_text="Help Text Placeholder",
    )
    zip_code = CustomCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Zipcode",
        help_text="Help Text Placeholder",
    )
    country = CustomCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="Country",
        help_text="Help Text Placeholder",
    )

    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


@custom_metadata(
    autoform_label="Manage User Theme Settings",
    long_description="This model represents the theme settings for a user. Users can customize their primary, secondary, and background colors to personalize their experience.",
    short_description="Model for managing user theme settings.",
    include_preview=False,
    icon="DisplaySettingsIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model stores the custom theme settings for each user in the application.",
        "fields": {
            "user": "The user associated with the theme settings.",
            "primary_color": "The primary color chosen by the user.",
            "secondary_color": "The secondary color chosen by the user.",
            "background_color": "The background color chosen by the user.",
        },
        "model_links": {
            "User": "/admin/auth/user/",
            "CustomCharField": "https://docs.djangoproject.com/en/3.2/ref/models/fields/#charfield",
        },
    },
)
class ThemeSettings(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="theme_settings",
        verbose_name="User",
        help_text="Help Text Placeholder",
    )
    primary_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Primary",
        help_text="Help Text Placeholder",
    )

    secondary_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Secondary",
        help_text="Help Text Placeholder",
    )
    background_color = CustomCharField(
        max_length=7,
        md_column_count=4,
        verbose_name="Background",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Theme Settings"
        verbose_name_plural = "Theme Settings"


@custom_metadata(
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
            "token": "The JWT token that has been blacklisted.",
            "blacklisted_at": "The time at which the token was blacklisted.",
        },
        "model_links": {
            "TokenAuthentication": "/admin/authentication/tokenauthentication/",
        },
    }
)
class TokenBlacklist(models.Model):
    token = CustomTextField(
        max_length=500,
        unique=True,
        md_column_count=12,
        verbose_name="Token",
        help_text="Help Text Placeholder",
    )
    blacklisted_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Blacklisted At",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.token

    class Meta:
        verbose_name = "Token Blacklist"
        verbose_name_plural = "Token Blacklist"
