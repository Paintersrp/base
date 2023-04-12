# Generated by Django 4.1.3 on 2023-04-05 23:30

import api.customs
from django.db import migrations
import django.db.models.deletion
import elements.models


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("elements", "0007_remove_elementset_elements_alter_element_category_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="elementitem",
            options={"verbose_name": "Element", "verbose_name_plural": "Element"},
        ),
        migrations.AlterUniqueTogether(
            name="elementitem",
            unique_together=set(),
        ),
        migrations.AddField(
            model_name="elementitem",
            name="content",
            field=api.customs.CustomForeignKeyField(
                blank=True,
              
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_query_name="data",
                to="contenttypes.contenttype",
                verbose_name="Data Model",
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
        migrations.AlterUniqueTogether(
            name="elementitem",
            unique_together={("element_set", "content", "object_id")},
        ),
        migrations.RemoveField(
            model_name="elementitem",
            name="content_type",
        ),
    ]