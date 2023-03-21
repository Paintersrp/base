from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Manage About Heading Block",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
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
        verbose_name = "Heading"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Mission Statement Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
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
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
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
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
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


class Skill(models.Model):
    name = CustomCharField(max_length=100)


@custom_metadata(
    autoform_label="Manage Team Member Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
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
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "About": "/about",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
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
