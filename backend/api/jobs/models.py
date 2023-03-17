from django.db import models
from auditlog.registry import auditlog
from api.customs import *


class Requirement(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


class Responsibilities(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


@custom_metadata(
    autoform_label="Job Posting Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Jobs": "/jobs",
        "Contact": "/contact",
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
class JobPosting(models.Model):
    position = CustomCharField(
        max_length=40,
        md_column_count=4,
        verbose_name="Position",
        help_text="Top Header Display of Hero Section",
    )
    location = CustomCharField(
        max_length=80,
        md_column_count=4,
        verbose_name="Location",
        help_text="Top Header Display of Hero Section",
    )
    type = CustomCharField(
        max_length=20,
        md_column_count=4,
        verbose_name="Type",
        help_text="Top Header Display of Hero Section",
    )
    tagline = CustomTextField(
        max_length=100,
        md_column_count=12,
        null=True,
        verbose_name="Tagline",
        help_text="Top Header Display of Hero Section",
    )
    who_we_are = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Who We Are",
        help_text="Top Header Display of Hero Section",
    )
    requirements = models.ManyToManyField(
        Requirement, related_name="requirement", verbose_name="Requirement"
    )
    responsibilities = models.ManyToManyField(
        Responsibilities,
        related_name="responsibilities",
        verbose_name="Responsibilities",
    )
    why_apply = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Why Apply",
        help_text="Top Header Display of Hero Section",
    )
    looking_for = CustomTextField(
        max_length=500,
        md_column_count=12,
        null=True,
        verbose_name="Looking For",
        help_text="Top Header Display of Hero Section",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    filled = models.BooleanField(
        default=False,
        verbose_name="Filled",
        help_text="Top Header Display of Hero Section",
    )

    def delete(self, *args, **kwargs):
        self.requirements.all().delete()
        self.responsibilities.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Job Openings"
        verbose_name_plural = "Job Openings"


@custom_metadata(
    autoform_label="Application Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Jobs": "/jobs",
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
class Application(models.Model):
    RESUME_UPLOAD_PATH = "resumes/"

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Reviewing", "Reviewing"),
        ("Rejected", "Rejected"),
        ("Accepted", "Accepted"),
    )

    first_name = CustomCharField(
        max_length=30,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="First Name",
        help_text="Top Header Display of Hero Section",
    )
    last_name = CustomCharField(
        max_length=30,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Last Name",
        help_text="Top Header Display of Hero Section",
    )
    email = CustomEmailField(
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Email",
        help_text="Top Header Display of Hero Section",
    )
    phone = CustomCharField(
        max_length=20,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Top Header Display of Hero Section",
    )
    created_at = models.DateTimeField(verbose_name="Created At", auto_now_add=True)
    city = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="City",
        help_text="Top Header Display of Hero Section",
    )
    zipcode = CustomCharField(
        max_length=15,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Zip Code",
        help_text="Top Header Display of Hero Section",
    )
    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="job",
        default=1,
        verbose_name="Job",
        help_text="Top Header Display of Hero Section",
    )

    resume = models.FileField(
        upload_to=RESUME_UPLOAD_PATH,
        verbose_name="Resume",
        blank=True,
        null=True,
        help_text="Supported file types: PDF, Microsoft Word, plain text.",
    )

    status = CustomCharField(
        max_length=20,
        xs_column_count=12,
        md_column_count=12,
        choices=STATUS_CHOICES,
        default="Pending",
        verbose_name="Status",
        help_text="Top Header Display of Hero Section",
    )

    class Meta:
        verbose_name = "Application"
        verbose_name_plural = "Applications"
