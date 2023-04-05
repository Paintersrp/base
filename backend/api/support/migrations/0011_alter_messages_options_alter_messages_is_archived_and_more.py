# Generated by Django 4.1.3 on 2023-04-04 21:50

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("support", "0010_alter_subscribers_email"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="messages",
            options={
                "ordering": ["-id"],
                "verbose_name": "Messages",
                "verbose_name_plural": "Messages",
            },
        ),
        migrations.AlterField(
            model_name="messages",
            name="is_archived",
            field=api.customs.CustomBooleanField(
                db_index=True,
                default=False,
                help_text="Is Archived Status",
                verbose_name="Is Archived",
            ),
        ),
        migrations.AlterField(
            model_name="messages",
            name="is_read",
            field=api.customs.CustomBooleanField(
                db_index=True,
                default=False,
                help_text="Is Read Status",
                verbose_name="Is Read",
            ),
        ),
        migrations.AlterField(
            model_name="subscribers",
            name="email",
            field=api.customs.CustomEmailField(
                db_index=True,
                help_text="Email Address",
                max_length=254,
                unique=True,
                verbose_name="Email",
            ),
        ),
    ]
