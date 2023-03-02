from django.db import models
from api.customs import CustomCharField, BaseModel
from auditlog.registry import auditlog
from api.signals import log_changes

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


# auditlog.register(Benefits)
