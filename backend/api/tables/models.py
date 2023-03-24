from django.db import models
from landing.models import ServiceTier
from api.customs import *


@custom_metadata(
    autoform_label="Service Table Labels Object",
    long_description="This model defines the labels for the services table in our application.",
    short_description="Labels for services table",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="ViewColumnIcon",
    icon_class=None,
    slug="service-table-labels",
    tags=["services", "table", "labels"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump = {
    "purpose": "This model defines the labels for the services table in our application.",
    "fields": {
        "name": "The name of the set of service tiers and icons.",
        "service_tier1": "The label for the first tier of service.",
        "tier1_icon": "The icon for the first tier of service.",
        "service_tier2": "The label for the second tier of service.",
        "tier2_icon": "The icon for the second tier of service.",
        "service_tier3": "The label for the third tier of service.",
        "tier3_icon": "The icon for the third tier of service."
    },
    "model_links": {
        "OpenAPI specification": "https://example.com/api/docs/",
        "Database schema": "https://example.com/db/schema/",
    },
}
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
    long_description="This model defines the rows for the Service Comparison Table.",
    short_description="Rows for Service Comparison Table",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="TableRowsIcon",
    icon_class=None,
    slug="service-comparison-table-rows",
    tags=["Services", "Comparison", "Table"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model defines the rows for the Service Comparison Table, allowing users to easily compare different service tiers based on various features.",
        "fields": {
            "table_name": "The name of the table, which is displayed above the row of features and tiers.",
            "feature": "The name of the feature being compared in the current row.",
            "tier1_value": "The value for the first tier of the current feature.",
            "tier2_value": "The value for the second tier of the current feature.",
            "tier3_value": "The value for the third tier of the current feature.",
        },
        "model_links": {
            "ServiceCompareRows": "https://example.com/docs/service-compare-rows/",
            "ServiceComparisonTable": "https://example.com/docs/service-comparison-table/",
        },
    },
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
    long_description="This model represents a table of services provided by the company.",
    short_description="Table of Services",
    pages_associated={
        "Services": "/services",
    },
    include_preview=False,
    icon="TableChartIcon",
    icon_class=None,
    slug="service-table",
    tags=["services", "company", "offerings"],
    related_components="Header",
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to represent a table of services provided by the company.",
        "fields": {
            "name": "The name of the service table, which is displayed as the top header in the hero section.",
            "labels": "The labels used in the service table, which provide context for each column.",
            "rows": "The rows in the service table, which represent the different services provided by the company."
        },
        "model_links": {
            "ServiceTableLabels": "/admin/app/servicetablelabels/",
            "ServiceCompareRows": "/admin/app/servicecomparerows/"
        },
    },
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
