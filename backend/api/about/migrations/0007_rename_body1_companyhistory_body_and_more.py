# Generated by Django 4.1.3 on 2023-02-08 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0006_alter_companyhistory_body1_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="companyhistory",
            old_name="body1",
            new_name="body",
        ),
        migrations.RenameField(
            model_name="missionstatement",
            old_name="body1",
            new_name="body",
        ),
        migrations.RemoveField(
            model_name="companyhistory",
            name="body2",
        ),
        migrations.RemoveField(
            model_name="companyhistory",
            name="body3",
        ),
        migrations.RemoveField(
            model_name="missionstatement",
            name="body2",
        ),
        migrations.RemoveField(
            model_name="missionstatement",
            name="body3",
        ),
    ]
