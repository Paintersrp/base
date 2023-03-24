from django.db import models
from auditlog.registry import auditlog
from api.customs import *


@custom_metadata(
    autoform_label="Job Posting Requirement Object",
    long_description="A requirement for a job posting",
    short_description="Job Requirement",
    pages_associated={
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="job-requirement",
    tags=["Job Posting", "Requirement"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a requirement for a job posting. It contains information about a specific requirement that a job posting may have, such as a required skill or qualification.",
        "fields": {
            "detail": "This field is a character field that stores the specific requirement for the job posting. It can be up to 200 characters in length.",
        },
        "model_links": {
            "JobPosting": "/jobs/job-posting/",
            "Skill": "/jobs/skill/",
        },
    })
class Requirement(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


@custom_metadata(
    autoform_label="Job Posting Responsibility Object",
    long_description="This model represents the responsibilities for a particular job posting.",
    short_description="Responsibilities for a Job Posting",
    pages_associated={
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    include_preview=True,
    icon=None,
    icon_class=None,
    slug="job-responsibilities",
    tags=["Job Postings", "Responsibilities"],
    related_components="Header",
    visibility=True,
    access_level="All",
   info_dump={
        "purpose": "This model is used to store the responsibilities for a particular job posting. It is intended to be used as part of a larger job posting application.",
        "fields": {
            "detail": "A text field containing the specific responsibilities for the job posting.",
        },
        "model_links": {
            "JobPosting": "/docs/models/job-posting/",
        },
    },)
class Responsibilities(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


@custom_metadata(
    autoform_label="Job Posting Object",
    long_description="This model represents a job posting on the company's careers page.",
    short_description="Model for a job posting",
    pages_associated={
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    include_preview=True,
    icon="JoinFullIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",

    info_dump={
        "purpose": "This model represents a job posting on the company's careers page.",
        "fields": {
            "position": "The title of the job.",
            "location": "The location of the job.",
            "type": "The type of job (e.g. full-time, part-time).",
            "tagline": "A short description of the job.",
            "who_we_are": "A description of the company and its values.",
            "requirements": "The requirements for the job.",
            "responsibilities": "The responsibilities of the job.",
            "looking_for": "A description of the ideal candidate for the job.",
            "why_apply": "A description of the benefits of working for the company.",
            "created_at": "The date and time the job posting was created.",
            "filled": "Whether or not the job has been filled.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "JobPosting model reference": "/api/jobposting/",
        },
    },
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

    looking_for = CustomTextField(
        max_length=500,
        md_column_count=12,
        null=True,
        verbose_name="Looking For",
        help_text="Top Header Display of Hero Section",
    )
    why_apply = CustomTextField(
        max_length=500,
        md_column_count=12,
        verbose_name="Why Apply",
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
    long_description="This model represents a job application submitted through the company's website.",
    short_description="Job Application",
    pages_associated={
        "Jobs": "/jobs",
        "Contact": "/contact",
    },
    include_preview=False,
    icon="ApprovalIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model stores information about a job application submitted through the company's website.",
        "fields": {
            "first_name": "The first name of the applicant.",
            "last_name": "The last name of the applicant.",
            "email": "The email address of the applicant.",
            "phone": "The phone number of the applicant.",
            "created_at": "The date and time the application was created.",
            "city": "The city of the applicant.",
            "zipcode": "The zip code of the applicant.",
            "job": "The job posting the applicant is applying for.",
            "resume": "The applicant's resume file.",
            "status": "The current status of the application (e.g. Pending, Reviewing, Rejected, Accepted).",
        },
        "model_links": {
            "JobPosting": "/job-postings",
            "Resume": "/resumes",
        },
    },
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
