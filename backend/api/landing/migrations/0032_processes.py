# Generated by Django 4.1.3 on 2023-03-28 19:48

import api.customs
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0031_alter_hero_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Processes",
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
                (
                    "name",
                    api.customs.CustomCharField(
                        default="Placeholder",
                        help_text="Hero Name",
                        max_length=20,
                        verbose_name="Hero Name",
                    ),
                ),
                ("processes", models.ManyToManyField(to="landing.process")),
                (
                    "title_block",
                    models.ForeignKey(
                        limit_choices_to={"name": "process"},
                        on_delete=django.db.models.deletion.CASCADE,
                        to="landing.titleblock",
                    ),
                ),
            ],
        ),
    ]