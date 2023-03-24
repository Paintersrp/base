from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Manage About Heading Block",
    long_description="This model represents the header block of the About page.",
    short_description="Header block for the About page.",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="Description",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header", "Bottomer"],
    visibility=True,
    access_level="All",
    info_dump = {
    "purpose": "This model represents the header block of the About page.",
    "fields": {
        "title": "The title of the header block.",
        "image": "The image used in the header block.",
    },
    "model_links": {
        "Header": "/header",
        "Bottomer": "/bottomer",
    },
}
)
class AboutBlock(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=10,
        verbose_name="Title",
        help_text="Help Text Placeholder",
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
    autoform_label="Manage Mission Statement Object",
    long_description="This model represents the mission statement for a company or organization.",
    short_description="A company's mission statement.",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="BusinessIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
info_dump={
        "purpose": "This model represents the mission statement for a company or organization.",
        "fields": {
            "title": "The title of the mission statement.",
            "body": "The content of the mission statement.",
        },
        "model_links": {
            "Company": "/admin/company",
            "About Page": "/admin/pages/about",
        },
    }
)
class MissionStatement(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=10,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Mission Statement"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Company History Object",
    long_description="This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
    short_description="Model for company history",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon="WorkHistoryIcon",
    icon_class=None,
    slug="company-history",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
        "fields": {
            "title": "The title of the company history entry.",
            "body": "The main text content of the company history entry.",
        },
        "model_links": {
            "Company": "/admin/core/company/",
        },
    },
)
class CompanyHistory(models.Model):
    title = CustomCharField(
        max_length=200,
        md_column_count=10,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    body = CustomTextField(
        max_length=10000,
        null=True,
        verbose_name="Body",
        markdown=True,
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "History"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Company Value Object",
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
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to store the core values of our company, which guide our decisions, actions, and behavior as a team.",
        "fields": {
            "title": "The title of the value, such as 'Integrity' or 'Customer Focus.'",
            "icon": "The name of the icon to use for this value, such as 'mdi-heart' or 'mdi-account-group.'"
        },
        "model_links": {
            "Learn more about our culture": "/culture",
            "Meet our team": "/team"
        }
    }
)
class Value(models.Model):
    title = CustomCharField(
        max_length=100,
        md_column_count=8,
        verbose_name="Title",
        help_text="Help Text Placeholder",
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=8,
        verbose_name="Icon",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Values"
        verbose_name_plural = "Values"


@custom_metadata(
    autoform_label="Manage FAQ Category Object",
    long_description="This model represents a category for frequently asked questions on our website.",
    short_description="FAQ Category",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=False,
    icon="CategoryIcon",
    icon_class=None,
    slug="faq-category",
    tags=["FAQ", "Category"],
    related_components="FAQ",
    visibility=True,
    access_level="All",
   info_dump={
        "purpose": "This model represents a category for frequently asked questions on our website.",
        "fields": {
            "name": "The name of the FAQ category.",
        },
        "model_links": {
            "FAQ": "/faq",
            "Question": "/question",
        },
    }
)
class Category(models.Model):
    name = CustomCharField(
        max_length=100,
        verbose_name="Category",
        md_column_count=12,
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "FAQ Categories"
        verbose_name_plural = verbose_name + "Categories"


@custom_metadata(
    autoform_label="Manage FAQ Object",
    long_description="This model represents frequently asked questions and answers related to our company and services.",
    short_description="FAQ Model",
    pages_associated={
        "Landing": "/",
        "About": "/about",
    },
    include_preview=True,
    icon="QuestionAnswerIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to manage frequently asked questions and their corresponding answers. It is intended to be used on pages where customers may have common questions about our products or services.",
        "fields": {
            "category": "This field represents the category that the question and answer belong to. It is a foreign key to the Category model.",
            "question": "This field represents the question being asked. It has a maximum length of 500 characters.",
            "answer": "This field represents the answer to the question being asked. It has a maximum length of 500 characters.",
        },
        "model_links": {
            "Category": "/admin/category/",
            "FAQ": "/admin/faq/",
        },
    },
)
class FAQ(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Category",
    )

    question = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Question",
        help_text="Help Text Placeholder",
    )
    answer = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Answer",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = verbose_name + "s"
