# Generated by Django 4.1.3 on 2023-04-04 04:09

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("general", "0005_alter_contenttextblock_description_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="header",
            options={
                "ordering": ["page"],
                "verbose_name": "SEO Headers",
                "verbose_name_plural": "SEO Headers",
            },
        ),
        migrations.AlterField(
            model_name="contenttextblock",
            name="slug",
            field=api.customs.CustomCharField(
                db_index=True,
                help_text="Identifier",
                max_length=20,
                unique=True,
                verbose_name="Slug",
            ),
        ),
        migrations.AlterField(
            model_name="header",
            name="page",
            field=api.customs.CustomCharField(
                db_index=True,
                help_text="Referential Page",
                max_length=20,
                verbose_name="Page",
            ),
        ),
    ]
