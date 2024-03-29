# Generated by Django 4.1.3 on 2023-04-06 15:43

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0025_headerelement_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="imageelement",
            name="caption",
            field=api.customs.CustomCharField(
                blank=True,
                help_text="Image Caption",
                max_length=100,
                null=True,
                verbose_name="Image Caption",
            ),
        ),
        migrations.AddField(
            model_name="imageelement",
            name="justify",
            field=api.customs.CustomCharField(
                choices=[("left", "Left"), ("center", "Center"), ("right", "Right")],
                default="center",
                help_text="Image Placement",
                max_length=10,
                verbose_name="Image Placement",
            ),
        ),
        migrations.AddField(
            model_name="imageelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[("small", "Small"), ("medium", "Medium"), ("full", "Full")],
                default="medium",
                help_text="Image Type",
                max_length=6,
                verbose_name="Image Type",
            ),
        ),
        migrations.AlterField(
            model_name="headerelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[
                    ("h1", "H1 (Page)"),
                    ("h2", "H2 (Page)"),
                    ("h3", "H3 (Section)"),
                    ("h4", "H4 (Section)"),
                    ("h5", "H5 (Content)"),
                    ("h6", "H6 (Content)"),
                ],
                default="h1",
                help_text="Header Type",
                max_length=2,
                verbose_name="Header Type",
            ),
        ),
        migrations.AlterField(
            model_name="imageelement",
            name="image",
            field=models.ImageField(
                help_text="Image", upload_to="imagelements", verbose_name="Image"
            ),
        ),
    ]
