# Generated by Django 4.1.3 on 2023-03-20 01:59

import api.customs
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0027_questionnaire_questionset_question_answerchoice"),
    ]

    operations = [
        migrations.AlterField(
            model_name="answerchoice",
            name="question",
            field=api.customs.CustomForeignKeyField(
                help_text="Top Header Display of Hero Section",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="answer_choices",
                to="services.question",
                verbose_name="Question Link",
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="order",
            field=api.customs.CustomPositiveIntegerField(
                default=0,
                help_text="Top Header Display of Hero Section",
                verbose_name="Question Ordering",
            ),
        ),
        migrations.AlterField(
            model_name="question",
            name="question_set",
            field=api.customs.CustomForeignKeyField(
                help_text="Top Header Display of Hero Section",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="questions",
                to="services.questionset",
                verbose_name="Question Set Link",
            ),
        ),
        migrations.AlterField(
            model_name="questionnaire",
            name="slug",
            field=api.customs.CustomSlugField(
                help_text="Help Text Placeholder", unique=True, verbose_name="Slug"
            ),
        ),
        migrations.AlterField(
            model_name="questionnaire",
            name="title",
            field=api.customs.CustomCharField(
                help_text="Top Header Display of Hero Section",
                max_length=255,
                verbose_name="Questionnaire Name",
            ),
        ),
        migrations.AlterField(
            model_name="questionset",
            name="order",
            field=api.customs.CustomPositiveIntegerField(
                default=0,
                help_text="Top Header Display of Hero Section",
                verbose_name="Question Set Ordering",
            ),
        ),
        migrations.AlterField(
            model_name="questionset",
            name="questionnaire",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="question_sets",
                to="services.questionnaire",
                verbose_name="Questionnaire Link",
            ),
        ),
    ]