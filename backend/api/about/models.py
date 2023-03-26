from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="About Header",
    long_description="This model represents the header block of the About page.",
    short_description="Header block for the About page.",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="Description",
    icon_class=None,
    slug="about-heading",
    tags=["About", "Header", "Company"],
    related_components=["AboutHeading"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the header block of the About page.",
        "fields": {
            "Image": "The image used in the header block.",
            "Company Name": "Name of the Company.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "AboutBlock model reference": "/docs/model/aboutblock/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class AboutBlock(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Title",
        help_text="Company Name",
    )
    image = models.ImageField(
        upload_to="about",
        verbose_name="Image",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "About Header"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Mission Statement",
    long_description="This model represents the mission statement for a company or organization.",
    short_description="A company's mission statement.",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="BusinessIcon",
    icon_class=None,
    slug="mission-statement",
    tags=["About", "Mission Statement", "Company"],
    related_components=["ContentSection"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the mission statement for a company or organization.",
        "fields": {
            "Section Title": "The title of the mission statement.",
            "Mission Statement Body": "The content of the mission statement.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "MissionStatement model reference": "/docs/model/missionstatement/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class MissionStatement(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        justify="center",
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Mission Statement Body",
    )

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Company History",
    long_description="This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
    short_description="Model for company history",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="WorkHistoryIcon",
    icon_class=None,
    slug="company-history",
    tags=["About", "History", "Company"],
    related_components=["ContentSection"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
        "fields": {
            "Section Title": "The title of the company history entry.",
            "Company History Body": "The main text content of the company history entry.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "CompanyHistory model reference": "/docs/model/companyhistory/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class CompanyHistory(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=12,
        verbose_name="Section Title",
        help_text="Section Title",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Company History Body",
    )

    class Meta:
        verbose_name = "History"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Company Value",
    long_description="This model represents the core values of our company.",
    short_description="Core company values.",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="JoinInnerIcon",
    icon_class=None,
    slug="company-values",
    tags=["Values", "Culture", "Company"],
    related_components=["ContentSection"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to store the core values of our company, which guide our decisions, actions, and behavior as a team.",
        "fields": {
            "Title": "The title of the value, such as 'Integrity' or 'Customer Focus.'",
            "Icon": "The name of the icon to use for this value, such as 'mdi-heart' or 'mdi-account-group.'",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Value model reference": "/docs/model/value/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class Value(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=12,
        verbose_name="Title",
        help_text="Value Title",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Value Icon",
    )

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"


@custom_metadata(
    autoform_label="FAQ Category",
    long_description="This model represents a category for frequently asked questions on our website.",
    short_description="FAQ Category",
    pages_associated={
        "About": "/about",
    },
    include_preview=False,
    icon="CategoryIcon",
    icon_class=None,
    slug="faq-category",
    tags=["FAQ", "Category"],
    related_components=["FAQAccordion"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a category for frequently asked questions on our website.",
        "fields": {
            "Category Name": "The name of the FAQ category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Category model reference": "/docs/model/category/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class Category(models.Model):
    name = CustomCharField(
        max_length=100,
        verbose_name="Category",
        md_column_count=12,
        help_text="Category Name",
    )

    class Meta:
        verbose_name = "FAQ Categories"
        verbose_name_plural = verbose_name + "Categories"


@custom_metadata(
    autoform_label="FAQ",
    long_description="This model represents frequently asked questions and answers related to our company and services.",
    short_description="FAQ Model",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="QuestionAnswerIcon",
    icon_class=None,
    slug="faq",
    tags=["About", "FAQ", "Question", "Answer", "Support"],
    related_components=["FAQAccordion"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to manage frequently asked questions and their corresponding answers. It is intended to be used on pages where customers may have common questions about our products or services.",
        "fields": {
            "Category": "This field represents the category that the question and answer belong to. It is a foreign key to the Category model.",
            "Question": "This field represents the question being asked. It has a maximum length of 500 characters.",
            "Answer": "This field represents the answer to the question being asked. It has a maximum length of 500 characters.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "FAQ model reference": "/docs/model/faq/",
            "About app documentation": "/docs/app/about/",
        },
    },
)
class FAQ(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Category",
        help_text="FAQ Category",
    )

    question = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Question",
        help_text="FAQ Question",
        min_rows=3,
    )
    answer = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Answer",
        help_text="FAQ Answer",
        min_rows=3,
    )

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = verbose_name + "s"
