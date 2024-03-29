# Generated by Django 4.1.3 on 2023-04-06 05:14

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0021_headerelement2"),
    ]

    operations = [
        migrations.DeleteModel(
            name="HeaderElement2",
        ),
        migrations.AddField(
            model_name="headerelement",
            name="alignment",
            field=api.customs.CustomCharField(
                blank=True,
                choices=[("Left", "Left"), ("Right", "Right"), ("Center", "Center")],
                help_text="Text Alignment",
                max_length=10,
                null=True,
                verbose_name="Text Alignment",
            ),
        ),
        migrations.AddField(
            model_name="headerelement",
            name="bottom_divider",
            field=api.customs.CustomBooleanField(
                default=False, help_text="Bottom Divider", verbose_name="Bottom Divider"
            ),
        ),
        migrations.AddField(
            model_name="headerelement",
            name="subtitle",
            field=api.customs.CustomCharField(
                blank=True,
                help_text="Header Subtitle (Optional)",
                max_length=100,
                null=True,
                verbose_name="Header Subtitle",
            ),
        ),
        migrations.AddField(
            model_name="headerelement",
            name="tagline",
            field=api.customs.CustomTextField(
                blank=True,
                help_text="Tagline (Optional)",
                max_length=300,
                null=True,
                verbose_name="Tagline",
            ),
        ),
        migrations.AddField(
            model_name="headerelement",
            name="top_divider",
            field=api.customs.CustomBooleanField(
                default=False, help_text="Top Divider", verbose_name="Top Divider"
            ),
        ),
        migrations.AlterField(
            model_name="headerelement",
            name="title",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Header Title",
                max_length=100,
                verbose_name="Header Title",
            ),
        ),
    ]
