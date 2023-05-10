from django.db import models
from api.customs import *
from authorization.models import User
from .metadata import *


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


@metadata(**FAQ_SET_METADATA)
class FAQSet(BaseFAQObject):
    TYPES = (
        ("Tabbed", "Tabbed"),
        ("List", "List"),
        ("Condensed", "Condensed"),
    )

    type = CustomCharField(
        max_length=10,
        verbose_name="FAQ Type",
        help_text="FAQ Type",
        md_column_count=6,
        choices=TYPES,
        default="Tabbed",
    )

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


@metadata(**FAQ_QUESTION_CATEGORY_METADATA)
class FAQQuestionCategory(BaseFAQObject):
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]
        verbose_name = "FAQ Question Category"
        verbose_name_plural = "FAQ Question Categorys"


@metadata(**FAQ_QUESTION_METADATA)
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


@metadata(**FAQ_ANSWER_METADATA)
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


@metadata(**FAQ_QUESTION_SET_METADATA)
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
