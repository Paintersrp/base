# Generated by Django 4.1.3 on 2023-04-05 16:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0039_delete_item"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="heroblock",
            options={
                "ordering": ["id"],
                "verbose_name": "Hero Section",
                "verbose_name_plural": "Hero Sections",
            },
        ),
    ]
