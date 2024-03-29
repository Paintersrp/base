# Generated by Django 4.1.3 on 2023-03-26 02:21

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0027_alter_feature_detail_alter_heroblock_buttontext_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="titleblock",
            name="alignment",
            field=api.customs.CustomCharField(
                choices=[("Left", "Left"), ("Right", "Right"), ("Center", "Center")],
                help_text="Text Alignment",
                max_length=10,
                verbose_name="Text Alignment",
            ),
        ),
    ]
