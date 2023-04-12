# Generated by Django 4.1.3 on 2023-04-04 21:50

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0037_alter_hero_options_alter_heroblock_options_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Testimonial",
        ),
        migrations.AlterModelOptions(
            name="heroblock",
            options={
                "ordering": ["-id"],
                "verbose_name": "Hero Section",
                "verbose_name_plural": "Hero Sections",
            },
        ),
        migrations.AlterModelOptions(
            name="servicetier",
            options={
                "ordering": ["price"],
                "verbose_name": "Service Tiers",
                "verbose_name_plural": "Service Tiers",
            },
        ),
        migrations.AlterField(
            model_name="heroblock",
            name="name",
            field=api.customs.CustomCharField(
                db_index=True,
                help_text="Referential Name",
                max_length=100,
                unique=True,
                verbose_name="Hero Block Name",
            ),
        ),
    ]