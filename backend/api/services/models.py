from django.db import models
from landing.models import ServiceTier
from api.customs import *
from auditlog.registry import auditlog


class Benefits(BaseModel):
    title = CustomCharField(max_length=100, md_column_count=6, verbose_name="Title")
    description = models.TextField(
        max_length=250,
        verbose_name="Description",
    )
    icon = CustomCharField(max_length=40, md_column_count=12, verbose_name="Icon")
    buttonText = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Button Text",
    )

    class Meta:
        verbose_name = "Benefits"
        verbose_name_plural = "Benefits"


class ProcessImageItem(models.Model):
    image = models.ImageField(upload_to="process_images", verbose_name="Image")
    service_tier = models.ForeignKey(
        ServiceTier, on_delete=models.CASCADE, related_name="process_images", null=True
    )

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


class ProcessImageItem(models.Model):
    image = models.ImageField(upload_to="process_images", verbose_name="Image")
    servicetier = models.ForeignKey(
        ServiceTier,
        on_delete=models.CASCADE,
        related_name="servicetier",
        null=True,
        verbose_name="Service Tier",
    )

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


class ProcessTextItem(models.Model):
    title = CustomCharField(
        max_length=100,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Title",
    )
    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=6,
        verbose_name="Description",
    )
    icon = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Icon",
    )

    class Meta:
        verbose_name = "Process Text Item"
        verbose_name_plural = "Process Text Items"


auditlog.register(Benefits)
auditlog.register(ProcessTextItem)
