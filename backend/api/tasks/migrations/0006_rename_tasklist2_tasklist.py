# Generated by Django 4.1.3 on 2023-04-17 02:00

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("tasks", "0005_delete_tasklist"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="TaskList2",
            new_name="TaskList",
        ),
    ]