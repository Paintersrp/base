from django.db import models
from api.customs import *


@metadata(
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
    related_components=["Questionnaire", "Quiz"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "The Questionnaire model is used to create and manage surveys that can be filled out by users to provide feedback.",
        "fields": {
            "Questionnaire Name": "The name of the questionnaire, which is displayed as the top header in the hero section.",
            "Slug (Identifier)": "A unique identifier for the questionnaire, used in the URL.",
            "Description": "A brief description of the questionnaire.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Questionnaire model reference": "/docs/model/questionnaire/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=[
        "slug",
        "id",
    ],
    allowed=True,
)
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


@metadata(
    autoform_label="Question Set",
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
    related_components=["Questionnaire", "Quiz"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a set of questions to be answered in a questionnaire.",
        "fields": {
            "Title": "The title of the question set.",
            "Order": "The ordering of the question set within the questionnaire.",
            "Description": "A description of the question set.",
            "Questionnaire": "Questionnaire to which the question sets belong.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionSet model reference": "/docs/model/questionset/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=["id", "title", "questionnaire"],
    allowed=False,
)
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


@metadata(
    autoform_label="Question",
    long_description="This model represents a question that can be displayed in a Question Set within a Questionnaire on the website.",
    short_description="An individual question",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuestionMarkIcon",
    icon_class=None,
    slug="question",
    tags=["Quiz", "Questionnaire", "Question"],
    related_components=["Questionnaire", "Quiz"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to represent a question that can be displayed in a Questionnaire/Question Set on the website. Each question has a text, a slug, and an order field that determines its position in the header. The question set to which each question belongs is specified using a foreign key field.",
        "fields": {
            "Text": "The text of the question that is displayed in the header.",
            "Question Set": "A foreign key field that links each question to the question set to which it belongs.",
            "Order": "An integer field that determines the order in which the questions are displayed in the header.",
            "Slug (Identifier)": "A slug field that is used to generate a URL for the question.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Question model reference": "/docs/model/question/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=["id", "slug", "question_set"],
    allowed=False,
)
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


@metadata(
    autoform_label="Answer Choice",
    long_description="This model represents the answer choices for Questionnaire questions.",
    short_description="Answer Choices Model",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="QuickreplyIcon",
    icon_class=None,
    slug="answer-choices",
    tags=["Questionnaire", "Multiple-Choice", "Answers"],
    related_components=["Questionnaire", "Quiz"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the possible answer choices for a multiple-choice question.",
        "fields": {
            "Text": "The text of the answer choice.",
            "Value": "The numerical value associated with the answer choice.",
            "Order": "The order in which the answer choices should be displayed.",
            "Question": "The question that this answer choice belongs to.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "AnswerChoice model reference": "/docs/model/answerchoice/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=["id", "text", "question"],
    allowed=False,
)
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


@metadata(
    autoform_label="Questionnaire Result",
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
    related_components=["Questionnaire", "Quiz"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the results of a user-filled questionnaire.",
        "fields": {
            "Questionnaire": "A foreign key reference to the Questionnaire model.",
            "Contact Name": "The name of the person who filled out the questionnaire.",
            "Contact Email": "The email address of the person who filled out the questionnaire.",
            "Contact Phone": "The phone number of the person who filled out the questionnaire (optional).",
            "Contact State": "The state of the person who filled out the questionnaire (optional).",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionnaireResults model reference": "/docs/model/questionnaireresults/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=[
        "id",
        "contact_state",
        "questionnaire",
    ],
    allowed=False,
)
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


@metadata(
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
    related_components=["Questionnaire", "Quiz"],
    visibility=False,
    access_level="All",
    info_dump={
        "purpose": "This model represents the answer choice selected by a user for a specific question in a questionnaire result. It is part of the overall questionnaire result, which can contain multiple answers for multiple questions.",
        "fields": {
            "Questionnaire Result": "A foreign key reference to the overall questionnaire result that this answer choice belongs to.",
            "Question": "A foreign key reference to the question that this answer choice is answering.",
            "Question Text": "The text of the question that this answer choice is answering.",
            "Answer Choice": "A foreign key reference to the specific answer choice that the user selected.",
            "Answer Choice Text": "The text of the answer choice that the user selected.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionnaireResultAnswer model reference": "/docs/model/questionnaireresultanswer/",
            "General app documentation": "/docs/app/quizes/",
        },
    },
    filter_options=[
        "id",
        "question",
        "answer_choice",
        "questionnaire_result",
    ],
    allowed=False,
)
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
