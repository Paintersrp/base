# Generated by Django 4.1.3 on 2023-04-05 23:03

import api.customs
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("elements", "0006_alter_element_category_elementset"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="elementset",
            name="elements",
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
        migrations.CreateModel(
            name="ElementItem",
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
                ("object_id", models.PositiveIntegerField()),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contenttypes.contenttype",
                    ),
                ),
                (
                    "element_set",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="elements.elementset",
                    ),
                ),
            ],
            options={
                "unique_together": {("element_set", "content_type", "object_id")},
            },
        ),
    ]
