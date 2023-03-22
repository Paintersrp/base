# Generated by Django 4.1.3 on 2023-03-21 02:40

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("general", "0003_alter_header_description_alter_header_keywords_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContentTextBlock",
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
                    "slug",
                    api.customs.CustomCharField(
                        help_text="Identifier",
                        max_length=20,
                        unique=True,
                        verbose_name="Slug",
                    ),
                ),
                (
                    "title",
                    api.customs.CustomTextField(
                        help_text="Top Header Display of Hero Section",
                        max_length=200,
                        verbose_name="Title",
                    ),
                ),
                (
                    "description",
                    api.customs.CustomTextField(
                        help_text="Top Header Display of Hero Section",
                        max_length=300,
                        verbose_name="Description",
                    ),
                ),
            ],
            options={
                "verbose_name": "Content Text Blocks",
                "verbose_name_plural": "Content Text Blocks",
            },
        ),
    ]