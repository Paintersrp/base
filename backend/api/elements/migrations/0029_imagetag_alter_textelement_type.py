# Generated by Django 4.1.3 on 2023-04-06 16:05

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0028_textelement_type_alter_headerelement_type_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ImageTag",
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
                        help_text="Tag Name", max_length=255, verbose_name="Tag Name"
                    ),
                ),
            ],
            options={
                "verbose_name": "Image Tag",
                "verbose_name_plural": "Image Tags",
            },
        ),
        migrations.AlterField(
            model_name="textelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[
                    ("Dense", "Dense"),
                    ("Light", "Light"),
                    ("Standard", "Standard"),
                ],
                default="Standard",
                help_text="Text Type",
                max_length=10,
                verbose_name="Text Type",
            ),
        ),
    ]