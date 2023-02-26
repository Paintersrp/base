from django.db import models


class Requirement(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


class Responsibilities(models.Model):
    detail = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.detail[:50]}..."


class JobPosting(models.Model):
    position = models.CharField(max_length=40)
    location = models.CharField(max_length=80)
    type = models.CharField(max_length=20)
    tagline = models.TextField(max_length=100, null=True)
    who_we_are = models.TextField(max_length=500)
    requirements = models.ManyToManyField(Requirement, related_name="requirement")
    responsibilities = models.ManyToManyField(
        Responsibilities, related_name="responsibilities"
    )
    why_apply = models.TextField(max_length=500)
    looking_for = models.TextField(max_length=500, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    filled = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.requirements.all().delete()
        self.responsibilities.all().delete()
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Job Openings"
        verbose_name_plural = "Job Openings"
