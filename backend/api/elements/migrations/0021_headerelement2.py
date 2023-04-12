# Generated by Django 4.1.3 on 2023-04-06 04:54

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0020_element_type_alter_headerelement_title_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="HeaderElement2",
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
                        default="Placeholder",
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
                    "order",
                    api.customs.CustomPositiveIntegerField(
                        default=0, verbose_name="Page Appearance Order"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True, null=True)),
                ("updated_at", models.DateTimeField(auto_now=True, null=True)),
                (
                    "title",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Header Title",
                        max_length=200,
                        verbose_name="Header Title",
                    ),
                ),
            ],
            options={
                "verbose_name": "Header Element",
                "verbose_name_plural": "Header Elements",
                "ordering": ["name"],
            },
        ),
    ]