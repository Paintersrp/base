# Generated by Django 4.1.3 on 2023-03-28 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0004_rename_object_id_reactcomponent_data_source_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="reactcomponent",
            name="data_source_id",
            field=models.PositiveIntegerField(blank=True, default=1),
        ),
    ]