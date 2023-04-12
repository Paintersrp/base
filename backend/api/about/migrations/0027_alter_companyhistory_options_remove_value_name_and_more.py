# Generated by Django 4.1.3 on 2023-04-04 03:40

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0026_aboutblock_name_companyhistory_name_faq_name_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="companyhistory",
            options={
                "verbose_name": "Company History",
                "verbose_name_plural": "Company Historys",
            },
        ),
        migrations.RemoveField(
            model_name="value",
            name="name",
        ),
        migrations.AlterField(
            model_name="aboutblock",
            name="name",
            field=api.customs.CustomCharField(
                help_text="Referential Name",
                max_length=100,
                unique=True,
                verbose_name="About Block Name",
            ),
        ),
        migrations.AlterField(
            model_name="companyhistory",
            name="name",
            field=api.customs.CustomCharField(
                help_text="Referential Name",
                max_length=100,
                unique=True,
                verbose_name="Company History Name",
            ),
        ),
        migrations.AlterField(
            model_name="missionstatement",
            name="name",
            field=api.customs.CustomCharField(
                help_text="Referential Name",
                max_length=100,
                unique=True,
                verbose_name="Mission Statement Name",
            ),
        ),
    ]