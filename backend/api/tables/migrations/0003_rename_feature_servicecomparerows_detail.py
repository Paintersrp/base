# Generated by Django 4.1.3 on 2023-03-26 02:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tables", "0002_alter_servicecomparerows_feature_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="servicecomparerows",
            old_name="feature",
            new_name="detail",
        ),
    ]