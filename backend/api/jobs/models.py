from django.db import models
from auditlog.registry import auditlog
from api.customs import CustomCharField, CustomEmailField, CustomTextField


class Requirement(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


class Responsibilities(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


class JobPosting(models.Model):
    position = CustomCharField(
        max_length=40, md_column_count=4, verbose_name="Position"
    )
    location = CustomCharField(
        max_length=80, md_column_count=4, verbose_name="Location"
    )
    type = CustomCharField(max_length=20, md_column_count=4, verbose_name="Type")
    tagline = CustomTextField(
        max_length=100, md_column_count=6, null=True, verbose_name="Tagline"
    )
    who_we_are = CustomTextField(
        max_length=500, md_column_count=6, verbose_name="Who We Are"
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
        max_length=500, md_column_count=6, verbose_name="Why Apply"
    )
    looking_for = CustomTextField(
        max_length=500, md_column_count=6, null=True, verbose_name="Looking For"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    filled = models.BooleanField(default=False, verbose_name="Filled")

    def delete(self, *args, **kwargs):
        self.requirements.all().delete()
        self.responsibilities.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Job Openings"
        verbose_name_plural = "Job Openings"


class Application(models.Model):
    RESUME_UPLOAD_PATH = "resumes/"
    RESUME_CHOICES = (
        ("pdf", "PDF"),
        ("doc", "Microsoft Word"),
        ("docx", "Microsoft Word (Open XML)"),
        ("txt", "Plain Text"),
    )

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
    )
    last_name = CustomCharField(
        max_length=30,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Last Name",
    )
    email = CustomEmailField(
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Email",
    )
    phone = CustomCharField(
        max_length=20,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Phone",
    )
    created_at = models.DateTimeField(verbose_name="Created At", auto_now_add=True)
    city = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="City",
    )
    zipcode = CustomCharField(
        max_length=15,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Zip Code",
    )
    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="job",
        default=1,
        verbose_name="Job",
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
    )

    class Meta:
        verbose_name = "Application"
        verbose_name_plural = "Applications"


auditlog.register(Application)
auditlog.register(JobPosting)
auditlog.register(Responsibilities)
auditlog.register(Requirement)
