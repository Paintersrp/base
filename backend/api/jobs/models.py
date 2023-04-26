from django.db import models
from auditlog.registry import auditlog
from api.customs import *
from .metadata import *


@metadata(**REQUIREMENT_METADATA)
class Requirement(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


@metadata(**RESPONSIBILITIES_METADATA)
class Responsibilities(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


@metadata(**JOB_POSTING_METADATA)
class JobPosting(models.Model):
    position = CustomCharField(
        max_length=40,
        md_column_count=4,
        verbose_name="Position",
        help_text="Job Title/Position",
        db_index=True,
    )
    location = CustomCharField(
        max_length=80,
        md_column_count=4,
        verbose_name="Location",
        help_text="Job Location",
    )
    type = CustomCharField(
        max_length=20,
        md_column_count=4,
        verbose_name="Type",
        help_text="Employment Type",
    )
    tagline = CustomTextField(
        max_length=100,
        md_column_count=12,
        null=True,
        verbose_name="Tagline",
        help_text="Job Post Tagline",
        min_rows=3,
    )
    who_we_are = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Who We Are",
        help_text="Who We Are Text",
    )
    requirements = models.ManyToManyField(
        Requirement,
        related_name="requirement",
        verbose_name="Requirements",
        help_text="Job Requirements",
    )
    responsibilities = models.ManyToManyField(
        Responsibilities,
        related_name="responsibilities",
        verbose_name="Responsibilities",
        help_text="Job Responsibilities",
    )

    looking_for = CustomTextField(
        max_length=500,
        md_column_count=12,
        null=True,
        verbose_name="Looking For",
        help_text="Looking For Text",
    )
    why_apply = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Why Apply",
        help_text="Why Apply Text",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
    )
    filled = models.BooleanField(
        default=False,
        verbose_name="Filled",
        help_text="Filled Status",
        db_index=True,
    )

    def __str__(self):
        return self.position

    def delete(self, *args, **kwargs):
        self.requirements.all().delete()
        self.responsibilities.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Job Openings"
        verbose_name_plural = "Job Openings"


@metadata(**APPLICAITON_METADATA)
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
        help_text="First Name",
    )
    last_name = CustomCharField(
        max_length=30,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Last Name",
        help_text="Last Name",
    )
    email = CustomEmailField(
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Email",
        help_text="Email Address",
    )
    phone = CustomCharField(
        max_length=20,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Phone",
        help_text="Phone Number",
    )
    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True,
    )
    city = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="City",
        help_text="City",
    )
    zipcode = CustomCharField(
        max_length=15,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Zip Code",
        help_text="Zip Code",
    )
    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="job",
        default=1,
        verbose_name="Job",
        help_text="Related Job",
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
        help_text="Application Status",
        db_index=True,
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.job.name}"

    class Meta:
        ordering = ["-id"]
        verbose_name = "Application"
        verbose_name_plural = "Applications"
