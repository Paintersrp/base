# Generated by Django 4.1.3 on 2023-03-20 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("quizes", "0004_questionnaireresults_contact_email_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="questionnaireresults",
            name="contact_time",
        ),
    ]
