# Generated by Django 4.1.3 on 2023-03-29 01:31

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ("articles", "0011_alter_articles_tags"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="articles",
            managers=[
                ("highlighted_objects", django.db.models.manager.Manager()),
            ],
        ),
    ]
