# Generated by Django 4.1.3 on 2023-02-20 20:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("authorization", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ThemeSettings",
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
                ("primary_color", models.CharField(max_length=7)),
                ("default_color", models.CharField(max_length=7)),
                ("background_color", models.CharField(max_length=7)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]