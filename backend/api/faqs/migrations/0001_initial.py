# Generated by Django 4.1.3 on 2023-04-11 01:55

import api.customs
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Answer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "answer",
                    api.customs.CustomTextField(
                        blank=True,
                        help_text="Answer",
                        max_length=500,
                        null=True,
                        verbose_name="Answer",
                    ),
                ),
                (
                    "author",
                    api.customs.CustomForeignKeyField(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_query_name="author",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="FAQ",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "description",
                    api.customs.CustomTextField(
                        blank=True,
                        help_text="Description (Optional)",
                        max_length=300,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "author",
                    api.customs.CustomForeignKeyField(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_query_name="author",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Question",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "question",
                    api.customs.CustomTextField(
                        blank=True,
                        help_text="Question",
                        max_length=500,
                        null=True,
                        verbose_name="Question",
                    ),
                ),
                (
                    "author",
                    api.customs.CustomForeignKeyField(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_query_name="author",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="QuestionCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "author",
                    api.customs.CustomForeignKeyField(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_query_name="author",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="QuestionSet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    api.customs.CustomCharField(
                        db_index=True,
                        default="Placeholder",
                        help_text="Element Name",
                        max_length=50,
                        verbose_name="Element Name",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "order",
                    api.customs.CustomPositiveIntegerField(
                        default=0, verbose_name="Appearance Order within Category"
                    ),
                ),
                (
                    "answer",
                    api.customs.CustomForeignKeyField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_query_name="set-answer",
                        to="faqs.answer",
                        verbose_name="Answer",
                    ),
                ),
                (
                    "author",
                    api.customs.CustomForeignKeyField(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_query_name="author",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
                (
                    "category",
                    api.customs.CustomForeignKeyField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_query_name="category",
                        to="faqs.questioncategory",
                        verbose_name="Question Category",
                    ),
                ),
                (
                    "faq",
                    api.customs.CustomForeignKeyField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="question_sets",
                        related_query_name="faq",
                        to="faqs.faq",
                        verbose_name="FAQ",
                    ),
                ),
                (
                    "question",
                    api.customs.CustomForeignKeyField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_query_name="set-question",
                        to="faqs.question",
                        verbose_name="Question",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="answer",
            name="question",
            field=api.customs.CustomForeignKeyField(
                on_delete=django.db.models.deletion.CASCADE,
                related_query_name="answer-question",
                to="faqs.question",
                verbose_name="Question",
            ),
        ),
    ]
