from django.db import models
from api.customs import *


@custom_metadata(
    autoform_label="Questionnaire",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Questionnaire(models.Model):
    title = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Questionnaire Name",
        help_text="Top Header Display of Hero Section",
    )

    slug = CustomSlugField(
        unique=True,
        verbose_name="Slug",
        md_column_count=6,
        help_text="Help Text Placeholder",
    )

    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Questionnaire"
        verbose_name_plural = "Questionnaires"

    def __str__(self):
        return self.title


@custom_metadata(
    autoform_label="Question Sets",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class QuestionSet(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire,
        on_delete=models.CASCADE,
        related_name="question_sets",
        verbose_name="Questionnaire Link",
    )

    title = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Question Set Title",
        help_text="Top Header Display of Hero Section",
    )

    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Help Text Placeholder",
    )

    order = CustomPositiveIntegerField(
        default=0,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Question Set Ordering",
        help_text="Top Header Display of Hero Section",
    )

    class Meta:
        verbose_name = "Question Set"
        verbose_name_plural = "Question Sets"
        ordering = ["order"]

    def __str__(self):
        return self.title


@custom_metadata(
    autoform_label="Questions",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class Question(models.Model):
    question_set = CustomForeignKeyField(
        QuestionSet,
        on_delete=models.CASCADE,
        related_name="questions",
        verbose_name="Question Set Link",
        help_text="Top Header Display of Hero Section",
    )
    text = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Question Text",
        help_text="Top Header Display of Hero Section",
    )
    order = CustomPositiveIntegerField(
        default=0,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Question Ordering",
        help_text="Top Header Display of Hero Section",
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Question"
        verbose_name_plural = "Questions"

    def __str__(self):
        return self.text


@custom_metadata(
    autoform_label="Answer Choices",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class AnswerChoice(models.Model):
    question = CustomForeignKeyField(
        Question,
        on_delete=models.CASCADE,
        related_name="answer_choices",
        verbose_name="Question Link",
        help_text="Top Header Display of Hero Section",
    )
    text = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Answer Text",
        help_text="Top Header Display of Hero Section",
    )
    value = CustomDecimalField(
        default=0.0,
        decimal_places=2,
        max_digits=8,
        md_column_count=6,
        verbose_name="Answer Value",
        help_text="Top Header Display of Hero Section",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Answer Ordering",
        help_text="Top Header Display of Hero Section",
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Answer Choice"
        verbose_name_plural = "Answer Choices"

    def __str__(self):
        return self.text


class QuestionnaireResults(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    # contact_name = models.CharField(max_length=255)
    # contact_email = models.EmailField(max_length=255)
    # contact_phone = models.CharField(max_length=20)
    results = models.JSONField()


class QuestionnaireResultAnswer(models.Model):
    questionnaire_result = models.ForeignKey(
        QuestionnaireResults, on_delete=models.CASCADE, related_name="answers"
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_choice = models.ForeignKey(
        AnswerChoice, on_delete=models.CASCADE, blank=True, null=True
    )
    text = models.CharField(max_length=255, blank=True, null=True)
