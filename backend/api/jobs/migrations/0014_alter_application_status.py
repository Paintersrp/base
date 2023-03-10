# Generated by Django 4.1.3 on 2023-03-07 21:36

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0013_application_resume_application_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="application",
            name="status",
            field=api.customs.CustomCharField(
                choices=[
                    ("Pending", "Pending"),
                    ("Reviewing", "Reviewing"),
                    ("Rejected", "Rejected"),
                    ("Accepted", "Accepted"),
                ],
                default="Pending",
                max_length=20,
                verbose_name="Status",
            ),
        ),
    ]