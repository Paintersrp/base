# Generated by Django 4.1.3 on 2023-03-04 22:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("authorization", "0005_subscriber"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Subscriber",
        ),
    ]
