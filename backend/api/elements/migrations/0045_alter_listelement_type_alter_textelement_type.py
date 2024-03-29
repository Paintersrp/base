# Generated by Django 4.1.3 on 2023-04-30 14:40

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "elements",
            "0044_cardelement_button_toggle_cardelement_share_toggle_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="listelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[
                    ("Standard", "Standard"),
                    ("Icon", "Icon"),
                    ("Image", "Image"),
                    ("Avatar", "Avatar"),
                ],
                default="Standard",
                help_text="List Type",
                max_length=10,
                verbose_name="List Type",
            ),
        ),
        migrations.AlterField(
            model_name="textelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[("Standard", "Standard"), ("Dense", "Dense")],
                default="Standard",
                help_text="Text Type",
                max_length=10,
                verbose_name="Text Type",
            ),
        ),
    ]
