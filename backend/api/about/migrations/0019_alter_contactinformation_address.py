# Generated by Django 4.1.3 on 2023-03-07 17:57

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0018_alter_category_options_alter_companyhistory_body_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contactinformation",
            name="address",
            field=api.customs.CustomTextField(
                max_length=200, null=True, verbose_name="Address"
            ),
        ),
    ]
