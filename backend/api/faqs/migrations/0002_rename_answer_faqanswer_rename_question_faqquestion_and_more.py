# Generated by Django 4.1.3 on 2023-04-11 02:12

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("faqs", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Answer",
            new_name="FAQAnswer",
        ),
        migrations.RenameModel(
            old_name="Question",
            new_name="FAQQuestion",
        ),
        migrations.RenameModel(
            old_name="QuestionCategory",
            new_name="FAQQuestionCategory",
        ),
        migrations.RenameModel(
            old_name="QuestionSet",
            new_name="FAQQuestionSet",
        ),
    ]