# Generated by Django 4.1.3 on 2023-04-06 03:06

import api.customs
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0015_headerelement2_imageelement2_textelement2_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="element2",
            name="name",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Element Name",
                max_length=50,
                verbose_name="Element Name",
            ),
        ),
        migrations.AddField(
            model_name="headerelement2",
            name="name",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Element Name",
                max_length=50,
                verbose_name="Element Name",
            ),
        ),
        migrations.AddField(
            model_name="imageelement2",
            name="name",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Element Name",
                max_length=50,
                verbose_name="Element Name",
            ),
        ),
        migrations.AddField(
            model_name="textelement2",
            name="name",
            field=api.customs.CustomCharField(
                db_index=True,
                default="Placeholder",
                help_text="Element Name",
                max_length=50,
                verbose_name="Element Name",
            ),
        ),
        migrations.AlterField(
            model_name="element",
            name="category",
            field=api.customs.CustomForeignKeyField(
                blank=True,
                limit_choices_to={"name__in": ("Test", "Test2")},
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="Element",
                to="elements.elementcategory",
                verbose_name="Element Category",
            ),
        ),
    ]
