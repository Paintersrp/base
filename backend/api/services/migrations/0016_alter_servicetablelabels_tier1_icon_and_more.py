# Generated by Django 4.1.3 on 2023-03-07 13:53

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0015_alter_processimageitem_servicetier_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="servicetablelabels",
            name="tier1_icon",
            field=api.customs.CustomCharField(max_length=40, verbose_name="Icon 1"),
        ),
        migrations.AlterField(
            model_name="servicetablelabels",
            name="tier2_icon",
            field=api.customs.CustomCharField(max_length=40, verbose_name="Icon 2"),
        ),
        migrations.AlterField(
            model_name="servicetablelabels",
            name="tier3_icon",
            field=api.customs.CustomCharField(max_length=40, verbose_name="Icon 3"),
        ),
    ]
