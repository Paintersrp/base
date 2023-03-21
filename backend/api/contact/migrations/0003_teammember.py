# Generated by Django 4.1.3 on 2023-03-20 18:20

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact", "0002_rename_contactinformation_contactinformation2"),
    ]

    operations = [
        migrations.CreateModel(
            name="TeamMember",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        help_text="Help Text Placeholder",
                        upload_to="about_members",
                        verbose_name="Image",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        help_text="Help Text Placeholder",
                        max_length=100,
                        verbose_name="Name",
                    ),
                ),
                (
                    "role",
                    api.customs.CustomCharField(
                        help_text="Help Text Placeholder",
                        max_length=100,
                        verbose_name="Role",
                    ),
                ),
                (
                    "bio",
                    api.customs.CustomTextField(
                        help_text="Help Text Placeholder",
                        max_length=500,
                        verbose_name="Bio",
                    ),
                ),
                (
                    "linkedIn",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="LinkedIn",
                    ),
                ),
                (
                    "github",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="GitHub",
                    ),
                ),
                (
                    "twitter",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="Twitter",
                    ),
                ),
                (
                    "facebook",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="Facebook",
                    ),
                ),
                (
                    "instagram",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="Instagram",
                    ),
                ),
                (
                    "youtube",
                    api.customs.CustomCharField(
                        blank=True,
                        help_text="Help Text Placeholder",
                        max_length=100,
                        null=True,
                        verbose_name="YouTube",
                    ),
                ),
            ],
            options={
                "verbose_name": "Members",
                "verbose_name_plural": "Members",
            },
        ),
    ]
