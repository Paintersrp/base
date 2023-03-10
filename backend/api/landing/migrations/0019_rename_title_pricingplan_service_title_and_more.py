# Generated by Django 4.1.3 on 2023-03-06 15:32

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0018_alter_process_description_alter_process_icon_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pricingplan",
            old_name="title",
            new_name="service_title",
        ),
        migrations.RemoveField(
            model_name="pricingplan",
            name="bestFor",
        ),
        migrations.RemoveField(
            model_name="pricingplan",
            name="guarantee",
        ),
        migrations.AddField(
            model_name="pricingplan",
            name="paragraph_one",
            field=api.customs.CustomTextField(
                default="Test", max_length=500, verbose_name="Paragraph 1"
            ),
        ),
        migrations.AddField(
            model_name="pricingplan",
            name="paragraph_three",
            field=api.customs.CustomTextField(
                default="Test", max_length=500, verbose_name="Paragraph 3"
            ),
        ),
        migrations.AddField(
            model_name="pricingplan",
            name="paragraph_two",
            field=api.customs.CustomTextField(
                default="Test", max_length=500, verbose_name="Paragraph 2"
            ),
        ),
    ]