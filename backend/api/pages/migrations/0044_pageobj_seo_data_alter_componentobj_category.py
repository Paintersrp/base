# Generated by Django 4.1.3 on 2023-04-05 18:22

import api.customs
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("general", "0006_alter_header_options_alter_contenttextblock_slug_and_more"),
        ("pages", "0043_alter_pageobj_options_remove_pageobj_verbose_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="pageobj",
            name="seo_data",
            field=api.customs.CustomForeignKeyField(
                default=3,
                on_delete=django.db.models.deletion.CASCADE,
                to="general.header",
                verbose_name="SEO Data",
            ),
        ),
        migrations.AlterField(
            model_name="componentobj",
            name="category",
            field=api.customs.CustomForeignKeyField(
                blank=True,
                limit_choices_to={
                    "name__in": (
                        "About",
                        "Ass",
                        "Boobs",
                        "Card",
                        "Contact",
                        "Heading",
                        "Landing",
                        "Poop",
                        "Texas",
                        "Text",
                        "Tits",
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
