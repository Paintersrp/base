from django.db import models
from api.customs import *
from .metadata import *


@metadata(**QUESTIONNAIRE_METADATA)
class Questionnaire(models.Model):
    title = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Questionnaire Name",
        help_text="Questionnaire Name",
    )

    slug = CustomSlugField(
        unique=True,
        verbose_name="Slug",
        md_column_count=6,
        help_text="Identifier",
    )

    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["slug"]
        verbose_name = "Questionnaire"
        verbose_name_plural = "Questionnaires"

    def __str__(self):
        return self.slug


@metadata(**QUESTION_SET_METADATA)
class QuestionSet(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire,
        on_delete=models.CASCADE,
        related_name="question_sets",
        verbose_name="Questionnaire Link",
        help_text="Test",
    )
    order = CustomPositiveIntegerField(
        default=0,
        md_column_count=6,
        verbose_name="Question Set Ordering",
        help_text="Display Order",
    )
    title = CustomCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Question Set Title",
        help_text="Question Set Title",
    )

    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )

    class Meta:
        ordering = ["title"]
        verbose_name = "Question Set"
        verbose_name_plural = "Question Sets"

    def __str__(self):
        return self.title


@metadata(**QUESTION_METADATA)
class Question(models.Model):
    question_set = CustomForeignKeyField(
        QuestionSet,
        on_delete=models.CASCADE,
        related_name="questions",
        verbose_name="Question Set Link",
        help_text="Linked Question Set",
    )
    text = CustomTextField(
        max_length=255,
        md_column_count=12,
        verbose_name="Question Text",
        help_text="Question Text",
        min_rows=3,
    )
    slug = CustomSlugField(
        verbose_name="Slug",
        md_column_count=6,
        help_text="Identifier",
        default="Placeholder",
    )
    order = CustomPositiveIntegerField(
        default=0,
        md_column_count=6,
        verbose_name="Question Ordering",
        help_text="Question Ordering",
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Question"
        verbose_name_plural = "Questions"

    def __str__(self):
        return self.text


@metadata(**ANSWER_CHOICE_METADATA)
class AnswerChoice(models.Model):
    question = CustomForeignKeyField(
        Question,
        on_delete=models.CASCADE,
        related_name="answer_choices",
        verbose_name="Question Link",
        help_text="Linked Question",
    )
    text = CustomTextField(
        max_length=255,
        md_column_count=12,
        verbose_name="Answer Text",
        help_text="Answer Text",
        min_rows=3,
    )
    value = CustomDecimalField(
        default=0.0,
        decimal_places=2,
        max_digits=8,
        md_column_count=6,
        verbose_name="Answer Value",
        help_text="Answer Value",
    )
    order = CustomPositiveIntegerField(
        default=0,
        md_column_count=6,
        verbose_name="Answer Ordering",
        help_text="Answer Ordering",
    )

    class Meta:
        ordering = ["question"]
        verbose_name = "Answer Choice"
        verbose_name_plural = "Answer Choices"

    def __str__(self):
        return self.text


@metadata(**QUESTIONNAIRE_RESULT_METADATA)
class QuestionnaireResults(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire,
        on_delete=models.CASCADE,
        verbose_name="Questionnaire",
        help_text="Linked Questionnaire",
    )
    contact_name = CustomCharField(
        max_length=255,
        null=False,
        md_column_count=6,
        verbose_name="Contact Name",
        help_text="Contact Full Name",
    )
    contact_email = CustomEmailField(
        max_length=255,
        null=False,
        md_column_count=6,
        verbose_name="Contact Email",
        help_text="Contact Email Address",
    )
    contact_phone = CustomCharField(
        max_length=20,
        null=True,
        md_column_count=6,
        verbose_name="Contact Phone",
        help_text="Contact Phone Number",
    )
    contact_state = CustomCharField(
        max_length=20,
        null=True,
        md_column_count=6,
        verbose_name="Contact State",
        help_text="Contact State of Residence",
    )
    results = models.JSONField()

    def __str__(self):
        return f"{self.contact_name} ({self.questionnaire})"

    class Meta:
        ordering = ["questionnaire", "contact_name"]
        verbose_name = "Questionnaire Results"
        verbose_name_plural = "Questionnaire Results"


@metadata(**QUESTIONNAIRE_RESULT_ANSWER_METADATA)
class QuestionnaireResultAnswer(models.Model):
    questionnaire_result = models.ForeignKey(
        QuestionnaireResults,
        on_delete=models.CASCADE,
        related_name="answers",
        verbose_name="Questionnaire Results",
        help_text="Linked Questionnaire Results",
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        verbose_name="Question",
        help_text="Linked Question",
    )
    question_text = CustomCharField(
        max_length=255,
        blank=True,
        null=True,
        md_column_count=6,
        verbose_name="Question Text",
        help_text="Question Text",
    )
    answer_choice = models.ForeignKey(
        AnswerChoice,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name="Answer Choice",
        help_text="Linked Answer Choice",
    )
    answer_choice_text = CustomCharField(
        max_length=255,
        blank=True,
        null=True,
        md_column_count=6,
        verbose_name="Answer Choice Text",
        help_text="Answer Choice Text",
    )

    def __str__(self):
        return f"{self.questionnaire_result} ({self.id})"

    class Meta:
        verbose_name = "Questionnaire Result Answer Choice"
        verbose_name_plural = "Questionnaire Result Answer Choices"
