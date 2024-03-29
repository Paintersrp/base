# Generated by Django 4.1.3 on 2023-03-26 17:45

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "quizes",
            "0008_alter_answerchoice_order_alter_answerchoice_question_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="answerchoice",
            name="text",
            field=api.customs.CustomTextField(
                help_text="Answer Text", max_length=255, verbose_name="Answer Text"
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="text",
            field=api.customs.CustomTextField(
                help_text="Question Text", max_length=255, verbose_name="Question Text"
            ),
        ),
    ]
