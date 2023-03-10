# Generated by Django 4.1.3 on 2023-03-02 03:47

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("support", "0002_alter_messages_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="messages",
            name="phone",
            field=api.customs.CustomCharField(
                default="555-555-5555", max_length=20, verbose_name="Phone"
            ),
        ),
        migrations.AlterField(
            model_name="messages",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
        ),
        migrations.AlterField(
            model_name="messages",
            name="email",
            field=api.customs.CustomEmailField(max_length=254, verbose_name="Email"),
        ),
        migrations.AlterField(
            model_name="messages",
            name="is_archived",
            field=api.customs.CustomBooleanField(
                default=False, verbose_name="Is Archived"
            ),
        ),
        migrations.AlterField(
            model_name="messages",
            name="is_read",
            field=api.customs.CustomBooleanField(default=False, verbose_name="Is Read"),
        ),
        migrations.AlterField(
            model_name="messages",
            name="is_replied",
            field=api.customs.CustomBooleanField(
                default=False, verbose_name="Is Replied"
            ),
        ),
        migrations.AlterField(
            model_name="messages",
            name="message",
            field=api.customs.CustomTextField(max_length=2000, verbose_name="Message"),
        ),
        migrations.AlterField(
            model_name="messages",
            name="name",
            field=api.customs.CustomCharField(max_length=50, verbose_name="Name"),
        ),
        migrations.AlterField(
            model_name="messages",
            name="subject",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Subject"),
        ),
    ]
