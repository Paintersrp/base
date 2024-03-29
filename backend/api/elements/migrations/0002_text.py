# Generated by Django 4.1.3 on 2023-04-05 21:11

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Text",
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
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                (
                    "description",
                    api.customs.CustomTextField(
                        blank=True,
                        help_text="Description (Optional)",
                        max_length=300,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "body",
                    api.customs.CustomTextField(
                        blank=True,
                        help_text="Description (Optional)",
                        max_length=2000,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
