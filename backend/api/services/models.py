from django.db import models
from landing.models import ServiceTier
from api.customs import *
from .models import *
from landing.models import TitleBlock
from tables.models import ServiceTable
from quizes.models import Questionnaire
from .metadata import *


@metadata(**BENEFITS_METADATA)
class Benefits(BaseModel):
    title = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Header",
        help_text="Header Text",
    )
    description = CustomTextField(
        max_length=250,
        verbose_name="Description",
        md_column_count=12,
        help_text="Content Text",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )
    buttonText = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Button Text",
        help_text="Button Text",
    )
    page_link = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Link",
        help_text="Page Link",
        default="about",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Benefits"
        verbose_name_plural = "Benefits"


@metadata(**PROCESS_IMAGE_ITEM_METADATA)
class ProcessImageItem(models.Model):
    image = models.ImageField(
        upload_to="process_images",
        verbose_name="Image",
    )
    servicetier = models.ForeignKey(
        ServiceTier,
        on_delete=models.CASCADE,
        related_name="servicetier",
        null=True,
        verbose_name="Service Tier",
        help_text="Service Tier Link",
    )

    def __str__(self):
        return self.servicetier.service_title

    class Meta:
        verbose_name = "Process Image Item"
        verbose_name_plural = "Process Image Items"


@metadata(**PROCESS_TEXT_ITEM_METADATA)
class ProcessTextItem(models.Model):
    title = CustomCharField(
        max_length=100,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Title",
        help_text="Header",
    )
    description = CustomTextField(
        max_length=500,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Description",
        help_text="Description",
        min_rows=3,
    )
    icon = CustomCharField(
        max_length=40,
        xs_column_count=12,
        md_column_count=12,
        verbose_name="Icon",
        help_text="Select Icon",
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]
        verbose_name = "Process Text Item"
        verbose_name_plural = "Process Text Items"


@metadata(**QUIZ_METADATA)
class Quiz(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Referential Name",
        help_text="Referential Name",
        default="Placeholder",
    )
    service_tiers = models.ManyToManyField(ServiceTier)
    benefits = models.ManyToManyField(Benefits)
    title_block = models.ForeignKey(
        TitleBlock, on_delete=models.CASCADE, limit_choices_to={"name": "benefits"}
    )
    tiers_table = models.ForeignKey(
        ServiceTable,
        on_delete=models.CASCADE,
        limit_choices_to={"name": "Tiers"},
        related_name="tiers",
    )
    competitors_table = models.ForeignKey(
        ServiceTable,
        on_delete=models.CASCADE,
        limit_choices_to={"name": "Competitors"},
        related_name="competitors",
    )
    questionnaire = models.ForeignKey(
        Questionnaire,
        on_delete=models.CASCADE,
        limit_choices_to={"slug": "service-quiz"},
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Quiz"
        verbose_name_plural = "Quizes"
