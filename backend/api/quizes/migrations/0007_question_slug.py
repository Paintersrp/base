# Generated by Django 4.1.3 on 2023-03-21 00:43

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("quizes", "0006_alter_questionnaireresults_contact_email_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="question",
            name="slug",
            field=api.customs.CustomSlugField(
                default="Placeholder",
                help_text="Help Text Placeholder",
                verbose_name="Slug",
            ),
        ),
    ]
