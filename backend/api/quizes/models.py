from django.db import models
from api.customs import *


@custom_metadata(
    autoform_label="Questionnaire",
    long_description="This model represents a questionnaire that users can fill out to provide feedback.",
    short_description="A model for creating and managing questionnaires.",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuestionAnswerIcon",
    icon_class=None,
    slug="questionnaire",
    tags=["Questionnaire", "Feedback", "Survey"],
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
    long_description="A set of questions to be answered in a questionnaire",
    short_description="Question Set",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuizIcon",
    icon_class=None,
    slug="question-set",
    tags=["Questionnaire", "Questions", "Survey"],
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
    long_description="This model represents a set of questions that can be displayed in the header of the website.",
    short_description="A set of questions for the header",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuestionMarkIcon",
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
    slug = CustomSlugField(
        verbose_name="Slug",
        md_column_count=6,
        help_text="Help Text Placeholder",
        default="Placeholder",
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
    long_description="This model represents the answer choices for a multiple-choice question.",
    short_description="Answer Choices Model",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuickreplyIcon",
    icon_class=None,
    slug="answer-choices",
    tags=["Questionnaire", "Multiple-Choice", "Answers"],
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


@custom_metadata(
    autoform_label="Questionnaire Results",
    long_description="Stores the results of a questionnaire filled out by a user.",
    short_description="Questionnaire Results Model",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="BarChartIcon",
    icon_class=None,
    slug="questionnaire-results",
    tags=["Questionnaire", "Results", "User Data"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class QuestionnaireResults(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    contact_name = models.CharField(max_length=255, null=False)
    contact_email = models.EmailField(max_length=255, null=False)
    contact_phone = models.CharField(max_length=20, null=True)
    contact_state = models.CharField(max_length=20, null=True)
    results = models.JSONField()

    class Meta:
        verbose_name = "Questionnaire Results"
        verbose_name_plural = "Questionnaire Results"


@custom_metadata(
    autoform_label="Questionnaire Result Answer Choice",
    long_description="This model stores the answer choices selected by a user for a specific question in a questionnaire result.",
    short_description="Stores answer choices for a question in a questionnaire result.",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="SummarizeIcon",
    icon_class=None,
    slug="questionnaire-result-answer-choice",
    tags=["Questionnaire", "Answer", "Choice"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class QuestionnaireResultAnswer(models.Model):
    questionnaire_result = models.ForeignKey(
        QuestionnaireResults, on_delete=models.CASCADE, related_name="answers"
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=255, blank=True, null=True)
    answer_choice = models.ForeignKey(
        AnswerChoice, on_delete=models.CASCADE, blank=True, null=True
    )
    answer_choice_text = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Questionnaire Result Answer Choice"
        verbose_name_plural = "Questionnaire Result Answer Choices"
