# Generated by Django 4.1.3 on 2023-04-06 04:26

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0019_headerelement_rename_element2_element_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="element",
            name="type",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Element Type",
                max_length=10,
                verbose_name="Element Type",
            ),
        ),
        migrations.AlterField(
            model_name="headerelement",
            name="title",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Header Title",
                max_length=200,
                verbose_name="Header Title",
            ),
        ),
        migrations.AlterField(
            model_name="textelement",
            name="text",
            field=api.customs.CustomTextField(
                blank=True,
                help_text="Text",
                max_length=300,
                null=True,
                verbose_name="Text",
            ),
        ),
    ]