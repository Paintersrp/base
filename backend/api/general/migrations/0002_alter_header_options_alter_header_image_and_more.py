# Generated by Django 4.1.3 on 2023-03-13 13:25

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("general", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="header",
            options={
                "verbose_name": "SEO Headers",
                "verbose_name_plural": "SEO Headers",
            },
        ),
        migrations.AlterField(
            model_name="header",
            name="image",
            field=models.ImageField(upload_to="seo_images", verbose_name="Image"),
        ),
        migrations.AlterField(
            model_name="header",
            name="keywords",
            field=api.customs.CustomTextField(max_length=200, verbose_name="Keywords"),
        ),
        migrations.AlterField(
            model_name="header",
            name="title",
            field=api.customs.CustomTextField(max_length=200, verbose_name="Title"),
        ),
        migrations.AlterField(
            model_name="header",
            name="url",
            field=api.customs.CustomURLField(verbose_name="URL"),
        ),
    ]