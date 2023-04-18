from django.db import models
from api.customs import *
from authorization.models import User


class BaseFAQObject(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Element Name",
        help_text="Element Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    class Meta:
        abstract = True


@metadata(
    autoform_label="FAQ Set",
    long_description="This model represents a set of frequently asked questions.",
    short_description="Model for FAQ sets",
    pages_associated={
        "FAQ Sets": "/faq-sets",
        "FAQ Objects": "/faq-objects",
    },
    include_preview=True,
    icon="FAQSetIcon",
    icon_class=None,
    slug="faq-sets",
    tags=["FAQ", "Objects"],
    related_components=[
        "FAQSetList",
        "FAQSetDetail",
        "FAQObjectList",
        "FAQObjectDetail",
    ],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a set of frequently asked questions.",
        "fields": {
            "Element Name": "The name of the FAQ set.",
            "Description": "A description of the FAQ set.",
            "Author": "The author of the FAQ set.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQSet model reference": "/docs/faqset/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
class FAQSet(BaseFAQObject):
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Set"
        verbose_name_plural = "FAQ Sets"


@metadata(
    autoform_label="FAQ Question Category",
    long_description="This model represents a category for frequently asked questions.",
    short_description="Model for FAQ question categories",
    pages_associated={
        "FAQs": "/faqs",
        "Question Categories": "/question_categories",
    },
    include_preview=True,
    icon="FAQCategoryIcon",
    icon_class=None,
    slug="faq-question-categories",
    tags=["FAQs", "Question Categories"],
    related_components=["FAQQuestionCategoryList", "FAQQuestionCategoryDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a category for frequently asked questions.",
        "fields": {
            "Category Name": "The name of the category.",
            "Author": "The author of the category.",
            "Question Count": "The number of questions associated with the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestionCategory model reference": "/docs/faqquestioncategory/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
class FAQQuestionCategory(BaseFAQObject):
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Question Category"
        verbose_name_plural = "FAQ Question Categorys"


@metadata(
    autoform_label="FAQ Question",
    long_description="This model represents a question in a FAQ.",
    short_description="Model for FAQ questions",
    pages_associated={
        "FAQ": "/faq",
        "Questions": "/faq/questions",
    },
    include_preview=True,
    icon="FAQQuestionIcon",
    icon_class=None,
    slug="faq-questions",
    tags=["FAQ", "Questions"],
    related_components=["FAQQuestionList", "FAQQuestionDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a question in a FAQ.",
        "fields": {
            "Element Name": "The name of the question.",
            "Question": "The text of the question.",
            "Author": "The author of the question.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestion model reference": "/docs/faqquestion/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
class FAQQuestion(BaseFAQObject):
    question = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Question",
        help_text="Question",
        min_rows=3,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Question"
        verbose_name_plural = "FAQ Questions"


@metadata(
    autoform_label="FAQ Answer",
    long_description="This model represents an answer to a frequently asked question.",
    short_description="Model for FAQ answers",
    pages_associated={
        "FAQ Questions": "/faq/questions",
        "FAQ Answers": "/faq/answers",
    },
    include_preview=True,
    icon="FAQAnswerIcon",
    icon_class=None,
    slug="faq-answers",
    tags=["FAQ", "Answers"],
    related_components=["FAQAnswerList", "FAQAnswerDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents an answer to a frequently asked question.",
        "fields": {
            "Answer": "The text of the answer.",
            "FAQ Question": "The question that this answer is associated with.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQAnswer model reference": "/docs/faqanswer/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
class FAQAnswer(BaseFAQObject):
    answer = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Answer",
        help_text="Answer",
        min_rows=3,
        blank=True,
        null=True,
    )
    faq_question = CustomForeignKeyField(
        FAQQuestion,
        on_delete=models.CASCADE,
        verbose_name="FAQ Question",
        related_query_name="faq_question",
        default=1,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Answer"
        verbose_name_plural = "FAQ Answers"


@metadata(
    autoform_label="FAQ Question Set",
    long_description="This model represents a set of FAQ questions and answers associated with an FAQ category and set.",
    short_description="Model for FAQ question sets",
    pages_associated={
        "FAQ Sets": "/faq/sets",
        "FAQ Categories": "/faq/categories",
        "FAQ Questions": "/faq/questions",
        "FAQ Answers": "/faq/answers",
    },
    include_preview=True,
    icon="FAQQuestionSetIcon",
    icon_class=None,
    slug="faq-question-sets",
    tags=["FAQ", "Questions", "Answers", "Categories", "Sets"],
    related_components=["FAQQuestionSetList", "FAQQuestionSetDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a set of FAQ questions and answers associated with an FAQ category and set.",
        "fields": {
            "Name": "The name of the FAQ question set.",
            "FAQ Set": "The FAQ set that the question set belongs to.",
            "FAQ Category": "The FAQ category that the question set belongs to.",
            "FAQ Question": "The FAQ question associated with the question set.",
            "FAQ Answer": "The FAQ answer associated with the question set.",
            "Order": "The appearance order of the question set within its category.",
            "Author": "The author of the question set.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestionSet model reference": "/docs/faqquestionset/",
        },
    },
    allowed=True,
    filter_options=["name"],
)
class FAQQuestionSet(BaseFAQObject):
    faqset = CustomForeignKeyField(
        FAQSet,
        on_delete=models.CASCADE,
        related_name="question_sets",
        verbose_name="FAQSet",
        related_query_name="faqset",
        default=1,
    )

    faq_category = CustomForeignKeyField(
        FAQQuestionCategory,
        on_delete=models.CASCADE,
        verbose_name="FAQ Question Category",
        related_query_name="faq_category",
        default=1,
    )

    faq_question = CustomForeignKeyField(
        FAQQuestion,
        on_delete=models.CASCADE,
        verbose_name="FAQ Question",
        related_query_name="faq_question",
        default=1,
    )
    faq_answer = CustomForeignKeyField(
        FAQAnswer,
        on_delete=models.CASCADE,
        verbose_name="FAQ Answer",
        related_query_name="faq_answer",
        default=1,
    )
    order = CustomPositiveIntegerField(
        default=0,
        verbose_name="Appearance Order within Category",
        md_column_count=6,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Question Set"
        verbose_name_plural = "FAQ Question Sets"
