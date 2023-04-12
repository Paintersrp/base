# Generated by Django 4.1.3 on 2023-04-06 00:53

import api.customs
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0013_alter_element_category_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="elementitem",
            unique_together=set(),
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