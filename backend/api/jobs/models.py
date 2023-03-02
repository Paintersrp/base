from django.db import models
from auditlog.registry import auditlog
from api.customs import CustomCharField


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
    tagline = models.TextField(max_length=100, null=True, verbose_name="Tagline")
    who_we_are = models.TextField(max_length=500, verbose_name="Who We Are")
    requirements = models.ManyToManyField(
        Requirement, related_name="requirement", verbose_name="Requirement"
    )
    responsibilities = models.ManyToManyField(
        Responsibilities,
        related_name="responsibilities",
        verbose_name="Responsibilities",
    )
    why_apply = models.TextField(max_length=500, verbose_name="Why Apply")
    looking_for = models.TextField(
        max_length=500, null=True, verbose_name="Looking For"
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


auditlog.register(JobPosting)
auditlog.register(Responsibilities)
auditlog.register(Requirement)
