from django.db import models
from landing.models import ServiceTier
from api.customs import *
from django.db.models.signals import post_save
from django.dispatch import receiver
from .metadata import *


@metadata(**SERVICE_TABLE_LABEL_METADATA)
class ServiceTableLabels(models.Model):
    name = CustomCharField(
        max_length=40,
        verbose_name="Set Name",
        md_column_count=12,
        default="Test",
        help_text="Referential Name",
        db_index=True,
    )
    service_tier1 = CustomCharField(
        max_length=40,
        verbose_name="Tier 1",
        md_column_count=6,
        help_text="Column One Name",
    )
    tier1_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 1",
        help_text="Column One Icon",
    )
    service_tier2 = CustomCharField(
        max_length=40,
        verbose_name="Tier 2",
        md_column_count=6,
        help_text="Column Two Name",
    )
    tier2_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 2",
        help_text="Column Two Icon",
    )
    service_tier3 = CustomCharField(
        max_length=40,
        verbose_name="Tier 3",
        md_column_count=6,
        help_text="Column Three Name",
    )
    tier3_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 3",
        help_text="Column Three Icon",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Service Table Labels"
        verbose_name_plural = "Service Table Labels"


@metadata(**SERVICE_COMPARE_ROWS_METADATA)
class ServiceCompareRows(models.Model):
    table_name = CustomCharField(
        max_length=40,
        verbose_name="Table Name",
        md_column_count=6,
        default="Service Tiers",
        help_text="Table Name Connection",
        db_index=True,
    )
    detail = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Feature",
        help_text="Row Feature",
    )
    tier1_value = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Tier 1",
        help_text="Cell 1 Value",
    )
    tier2_value = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Tier 2",
        help_text="Cell 2 Value",
    )
    tier3_value = CustomCharField(
        max_length=100,
        md_column_count=4,
        verbose_name="Tier 3",
        help_text="Cell 3 Value",
    )

    def __str__(self):
        return f"{self.table_name} ({self.id})"

    class Meta:
        ordering = ["table_name", "detail"]
        verbose_name = "Service Table Rows"
        verbose_name_plural = "Service Table Rows"


@metadata(**SERVICE_TABLE_METADATA)
class ServiceTable(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Table Name",
        help_text="Table Name",
        db_index=True,
    )

    labels = models.OneToOneField(
        ServiceTableLabels,
        on_delete=models.CASCADE,
        verbose_name="Table Labels",
        related_name="service_table",
        help_text="Table Name",
        null=True,
        blank=True,
    )

    rows = models.ManyToManyField(
        ServiceCompareRows,
        verbose_name="Table Rows",
        related_name="service_tables",
        help_text="Table Rows",
        blank=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Service Table"
        verbose_name_plural = "Service Tables"


@receiver(post_save, sender=ServiceCompareRows)
def update_service_table(sender, instance, created, **kwargs):
    service_table, _ = ServiceTable.objects.get_or_create(name=instance.table_name)
    service_table.rows.add(instance)
    print("added")


@metadata(**TABLE_METADATA)
class Table(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Table Name",
        help_text="Table Name",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Table"
        verbose_name_plural = "Tables"


@metadata(**COLUMN_METADATA)
class Column(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Column Name",
        help_text="Column Name",
        md_column_count=6,
        db_index=True,
    )
    table = CustomForeignKeyField(
        Table,
        on_delete=models.CASCADE,
        related_name="columns",
        verbose_name="Table",
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name = "Column"
        verbose_name_plural = "Columns"


@metadata(**ROW_METADATA)
class Row(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Row Name",
        help_text="Row Name",
        md_column_count=6,
        db_index=True,
        null=True,
        blank=True,
    )
    table = CustomForeignKeyField(
        Table,
        on_delete=models.CASCADE,
        related_name="rows",
        verbose_name="Table",
    )

    def __str__(self):
        return f"Row {self.id}"

    class Meta:
        ordering = ["id"]
        verbose_name = "Row"
        verbose_name_plural = "Rows"


@metadata(**CELL_METADATA)
class Cell(models.Model):
    value = CustomCharField(
        max_length=255,
        verbose_name="Cell Value",
        help_text="Cell Value",
        md_column_count=6,
        db_index=True,
    )
    column = CustomForeignKeyField(
        Column,
        on_delete=models.CASCADE,
        related_name="cells",
        verbose_name="Column",
    )
    row = CustomForeignKeyField(
        Row,
        on_delete=models.CASCADE,
        related_name="cells",
        verbose_name="Row",
    )

    def __str__(self):
        return self.value

    class Meta:
        ordering = ["id"]
        verbose_name = "Cell"
        verbose_name_plural = "Cells"
