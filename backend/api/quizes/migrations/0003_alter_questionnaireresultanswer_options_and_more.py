# Generated by Django 4.1.3 on 2023-03-20 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("quizes", "0002_questionnaireresults_questionnaireresultanswer"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="questionnaireresultanswer",
            options={
                "verbose_name": "Questionnaire Result Answer Choice",
                "verbose_name_plural": "Questionnaire Result Answer Choices",
            },
        ),
        migrations.AlterModelOptions(
            name="questionnaireresults",
            options={
                "verbose_name": "Questionnaire Results",
                "verbose_name_plural": "Questionnaire Results",
            },
        ),
        migrations.RenameField(
            model_name="questionnaireresultanswer",
            old_name="text",
            new_name="answer_choice_text",
        ),
        migrations.AddField(
            model_name="questionnaireresultanswer",
            name="question_text",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]