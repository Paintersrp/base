# Generated by Django 4.1.3 on 2023-04-03 18:04

import api.customs
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0023_alter_componentobj_category_app"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="app",
            options={"verbose_name": "App", "verbose_name_plural": "App"},
        ),
        migrations.AddField(
            model_name="app",
            name="nav_component",
            field=api.customs.CustomCharField(
                blank=True,
                choices=[("Left", "Left"), ("Right", "Right"), ("Center", "Center")],
                help_text="Navigation Component Choice",
                max_length=10,
                null=True,
                verbose_name="Navigation Component",
            ),
        ),
        migrations.AlterField(
            model_name="app",
            name="app_name",
            field=api.customs.CustomCharField(
                help_text="App Name", max_length=50, verbose_name="App Name"
            ),
        ),
        migrations.AlterField(
            model_name="app",
            name="jobs",
            field=api.customs.CustomBooleanField(
                default=False, help_text="Jobs", verbose_name="Jobs"
            ),
        ),
        migrations.AlterField(
            model_name="app",
            name="services",
            field=api.customs.CustomBooleanField(
                default=False, help_text="Services", verbose_name="Services"
            ),
        ),
        migrations.AlterField(
            model_name="app",
            name="users",
            field=api.customs.CustomBooleanField(
                default=False, help_text="Users", verbose_name="Users"
            ),
        ),
        migrations.AlterField(
            model_name="componentobj",
            name="category",
            field=api.customs.CustomForeignKeyField(
                blank=True,
                limit_choices_to={
                    "name__in": (
                        "Contact",
                        "Landing",
                        "About",
                        "Heading",
                        "Card",
                        "Text",
                    )
                },
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="components",
                to="pages.componentcategory",
                verbose_name="Component Category",
            ),
        ),
    ]