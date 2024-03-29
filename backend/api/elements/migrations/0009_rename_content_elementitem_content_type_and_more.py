# Generated by Django 4.1.3 on 2023-04-05 23:34

import api.customs
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("elements", "0008_alter_elementitem_options_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="elementitem",
            old_name="content",
            new_name="content_type",
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
            unique_together={("element_set", "content_type", "object_id")},
        ),
    ]
