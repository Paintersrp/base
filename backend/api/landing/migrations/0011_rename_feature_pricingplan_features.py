# Generated by Django 4.1.3 on 2023-02-25 03:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0010_alter_feature_options_alter_heroblock_options_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pricingplan",
            old_name="feature",
            new_name="features",
        ),
    ]
