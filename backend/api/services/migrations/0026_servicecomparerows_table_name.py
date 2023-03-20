# Generated by Django 4.1.3 on 2023-03-19 22:08

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0025_servicetablelabels_name_alter_servicetable_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="servicecomparerows",
            name="table_name",
            field=api.customs.CustomCharField(
                default="Service Tiers", max_length=40, verbose_name="Table Name"
            ),
        ),
    ]
