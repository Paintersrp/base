# Generated by Django 4.1.3 on 2023-03-14 20:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0024_alter_heroblock_text"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="supportedsites",
            options={
                "verbose_name": "Supported Sites",
                "verbose_name_plural": "Supported Sites",
            },
        ),
    ]
