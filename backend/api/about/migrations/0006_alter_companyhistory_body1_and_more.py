# Generated by Django 4.1.3 on 2023-02-08 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0005_value"),
    ]

    operations = [
        migrations.AlterField(
            model_name="companyhistory",
            name="body1",
            field=models.CharField(max_length=10000, null=True),
        ),
        migrations.AlterField(
            model_name="missionstatement",
            name="body1",
            field=models.CharField(max_length=10000, null=True),
        ),
    ]
