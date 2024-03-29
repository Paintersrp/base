# Generated by Django 4.1.3 on 2023-04-06 04:09

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("elements", "0018_remove_elementitem_content_type_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="HeaderElement",
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
                ("title", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True, null=True)),
                ("updated_at", models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                "verbose_name": "Header Element",
                "verbose_name_plural": "Header Elements",
                "ordering": ["name"],
            },
        ),
        migrations.RenameModel(
            old_name="Element2",
            new_name="Element",
        ),
        migrations.RenameModel(
            old_name="ElementSet2",
            new_name="ElementSet",
        ),
        migrations.RenameModel(
            old_name="ImageElement2",
            new_name="ImageElement",
        ),
        migrations.RenameModel(
            old_name="TextElement2",
            new_name="TextElement",
        ),
        migrations.DeleteModel(
            name="HeaderElement2",
        ),
    ]
