# Generated by Django 4.1.3 on 2023-02-27 23:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        (
            "services",
            "0005_alter_benefits_buttontext_alter_benefits_description_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="benefits",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="benefits",
            name="updated_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]