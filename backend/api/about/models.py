from django.db import models
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Manage About Heading Block",
    autoform_description="Description Placeholder",
    pages_associated={
        "About": "/about",
    },
    include_preview=False,
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
    autoform_description="Description Placeholder",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
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
    autoform_description="Description Placeholder",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
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
    autoform_description="Description Placeholder",
    pages_associated={
        "About": "/about",
    },
    include_preview=True,
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
    autoform_label="Manage Company Contact Information Object",
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
)
class ContactInformation(models.Model):
    email = CustomEmailField(
        md_column_count=6,
        verbose_name="Email",
        help_text="Help Text Placeholder",
    )
    phone = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Help Text Placeholder",
    )
    address = CustomTextField(
        max_length=200,
        null=True,
        verbose_name="Address",
        markdown=False,
        help_text="Help Text Placeholder",
    )

    monday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Monday",
        help_text="Help Text Placeholder",
    )

    tuesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Tuesday",
        help_text="Help Text Placeholder",
    )

    wednesday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Wednesday",
        help_text="Help Text Placeholder",
    )

    thursday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=3,
        verbose_name="Thursday",
        help_text="Help Text Placeholder",
    )

    friday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Friday",
        help_text="Help Text Placeholder",
    )

    saturday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Saturday",
        help_text="Help Text Placeholder",
    )

    sunday = CustomCharField(
        max_length=40,
        null=True,
        md_column_count=4,
        verbose_name="Sunday",
        help_text="Help Text Placeholder",
    )

    facebook = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Facebook",
        help_text="Help Text Placeholder",
    )

    linkedin = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="LinkedIn",
        help_text="Help Text Placeholder",
    )

    instagram = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Instagram",
        help_text="Help Text Placeholder",
    )

    twitter = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Twitter",
        help_text="Help Text Placeholder",
    )
    youtube = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Youtube",
        help_text="Help Text Placeholder",
    )
    github = CustomCharField(
        max_length=100,
        null=True,
        md_column_count=6,
        verbose_name="Github",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = verbose_name + "s"


@custom_metadata(
    autoform_label="Manage Team Member Object",
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
)
class TeamMember(models.Model):
    image = models.ImageField(
        upload_to="about_members",
        verbose_name="Image",
        help_text="Help Text Placeholder",
    )
    name = CustomCharField(
        max_length=100,
        md_column_count=5,
        verbose_name="Name",
        help_text="Help Text Placeholder",
    )
    role = CustomCharField(
        max_length=100,
        md_column_count=5,
        verbose_name="Role",
        help_text="Help Text Placeholder",
    )
    bio = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Bio",
        help_text="Help Text Placeholder",
    )

    linkedIn = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="LinkedIn",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    github = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="GitHub",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    twitter = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Twitter",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    facebook = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Facebook",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    instagram = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Instagram",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )
    youtube = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="YouTube",
        blank=True,
        null=True,
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Members"
        verbose_name_plural = "Members"


@custom_metadata(
    autoform_label="Manage Team Member Object",
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "Contact": "/contact",
    },
    include_preview=True,
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
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "About": "/about",
    },
    include_preview=True,
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
