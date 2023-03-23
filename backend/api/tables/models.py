from django.db import models
from landing.models import ServiceTier
from api.customs import *


@custom_metadata(
    autoform_label="Service Table Labels Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="ViewColumnIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class ServiceTableLabels(models.Model):
    name = CustomCharField(
        max_length=40, verbose_name="Set Name", md_column_count=12, default="Test"
    )
    service_tier1 = CustomCharField(
        max_length=40,
        verbose_name="Tier 1",
        md_column_count=6,
    )
    tier1_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 1",
    )
    service_tier2 = CustomCharField(
        max_length=40,
        verbose_name="Tier 2",
        md_column_count=6,
    )
    tier2_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 2",
    )
    service_tier3 = CustomCharField(
        max_length=40,
        verbose_name="Tier 3",
        md_column_count=6,
    )
    tier3_icon = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Icon 3",
    )

    class Meta:
        verbose_name = "Service Table Labels"
        verbose_name_plural = "Service Table Labels"


@custom_metadata(
    autoform_label="Service Compare Rows Object",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="TableRowsIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class ServiceCompareRows(models.Model):
    table_name = CustomCharField(
        max_length=40,
        verbose_name="Table Name",
        md_column_count=12,
        default="Service Tiers",
    )
    feature = CustomCharField(
        max_length=40,
        md_column_count=6,
        verbose_name="Feature",
        help_text="Help Text Placeholder",
    )
    tier1_value = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Tier 1",
        help_text="Help Text Placeholder",
    )
    tier2_value = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Tier 2",
        help_text="Help Text Placeholder",
    )
    tier3_value = CustomCharField(
        max_length=100,
        md_column_count=6,
        verbose_name="Tier 3",
        help_text="Help Text Placeholder",
    )

    class Meta:
        verbose_name = "Service Table Rows"
        verbose_name_plural = "Service Table Rows"


@custom_metadata(
    autoform_label="Service Table",
    long_description="Description Placeholder",
    short_description="Short Description",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="TableChartIcon",
    icon_class=None,
    slug="header",
    tags=["About", "Header", "Company"],
    related_components="Header",
    visibility=True,
    access_level="All",
)
class ServiceTable(models.Model):

    name = CustomCharField(
        max_length=20,
        md_column_count=6,
        verbose_name="Table Name",
        help_text="Top Header Display of Hero Section",
    )

    labels = models.OneToOneField(
        ServiceTableLabels,
        on_delete=models.CASCADE,
        verbose_name="Table Labels",
        related_name="service_table",
    )

    rows = models.ManyToManyField(
        ServiceCompareRows,
        verbose_name="Table Rows",
        related_name="service_tables",
    )

    class Meta:
        verbose_name = "Service Table"
        verbose_name_plural = "Service Tables"
