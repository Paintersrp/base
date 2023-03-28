from django.db import models
from authorization.models import User
from api.customs import *
from auditlog.registry import auditlog
from auditlog.models import AuditlogHistoryField


@custom_metadata(
    autoform_label="TitleBlock Titties",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="StyleIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "Position": "The title of the job.",
            "Location": "The location of the job.",
            "Type": "The type of job (e.g. full-time, part-time).",
            "Tagline": "A short description of the job.",
            "Who We Are": "A description of the company and its values.",
            "Requirements": "The requirements for the job.",
            "Responsibilities": "The responsibilities of the job.",
            "Looking For": "A description of the ideal candidate for the job.",
            "Why Apply": "A description of the benefits of working for the company.",
            "Filled": "Whether or not the job has been filled.",
            "Created At (auto-generated)": "The date and time the job posting was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/docs/jobposting/",
        },
    },
)
class Tags(models.Model):
    detail = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.detail

    def article_count(self):
        return self.article_set.count()

    article_count.short_description = "Article Count"

    class Meta:
        verbose_name = "Tags"
        verbose_name_plural = "Tags"


@custom_metadata(
    autoform_label="TitleBlock Titties",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Landing": "/",
        "Services": "/services",
    },
    include_preview=True,
    icon="NewspaperIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components=["Header"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "Position": "The title of the job.",
            "Location": "The location of the job.",
            "Type": "The type of job (e.g. full-time, part-time).",
            "Tagline": "A short description of the job.",
            "Who We Are": "A description of the company and its values.",
            "Requirements": "The requirements for the job.",
            "Responsibilities": "The responsibilities of the job.",
            "Looking For": "A description of the ideal candidate for the job.",
            "Why Apply": "A description of the benefits of working for the company.",
            "Filled": "Whether or not the job has been filled.",
            "Created At (auto-generated)": "The date and time the job posting was created.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/docs/jobposting/",
        },
    },
)
class Articles(models.Model):
    title = CustomCharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tags, related_name="articles", verbose_name="Tags")
    image = models.ImageField(blank=True, null=True, upload_to="article_images")
    is_highlighted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Articles"
        verbose_name_plural = "Articles"
