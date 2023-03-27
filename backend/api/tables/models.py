from django.db import models
from landing.models import ServiceTier
from api.customs import *
from django.db.models.signals import post_save
from django.dispatch import receiver


@custom_metadata(
    autoform_label="Service Table Columns",
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
    related_components=["ComparisonTable", "TableDisplay"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model defines the labels for the services table in our application.",
        "fields": {
            "Name": "The name of the set of service tiers and icons.",
            "Column One": "The label for the first tier of service.",
            "Icon One": "The icon for the first tier of service.",
            "Column Two": "The label for the second tier of service.",
            "Icon Two": "The icon for the second tier of service.",
            "Column Three": "The label for the third tier of service.",
            "Icon Three": "The icon for the third tier of service.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTableLabels model reference": "/docs/model/servicetablelabels/",
            "General app documentation": "/docs/app/tables/",
        },
    },
)
class ServiceTableLabels(models.Model):
    name = CustomCharField(
        max_length=40,
        verbose_name="Set Name",
        md_column_count=12,
        default="Test",
        help_text="Referential Name",
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

    class Meta:
        verbose_name = "Service Table Labels"
        verbose_name_plural = "Service Table Labels"


@custom_metadata(
    autoform_label="Service Compare Rows",
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
    related_components=["ComparisonTable", "TableDisplay"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model defines the rows for the Service Comparison Table, allowing users to easily compare different service tiers based on various features.",
        "fields": {
            "Table Name": "The name of the table, which is displayed above the row of features and tiers.",
            "Feature": "The name of the feature being compared in the current row.",
            "Cell 1 Value": "The value for the first tier of the current feature.",
            "Cell 2 Value": "The value for the second tier of the current feature.",
            "Cell 3 Value": "The value for the third tier of the current feature.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceCompareRows model reference": "/docs/model/servicecomparerows/",
            "General app documentation": "/docs/app/tables/",
        },
    },
)
class ServiceCompareRows(models.Model):
    table_name = CustomCharField(
        max_length=40,
        verbose_name="Table Name",
        md_column_count=6,
        default="Service Tiers",
        help_text="Table Name Connection",
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
    related_components=["ComparisonTable", "TableDisplay"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to represent a table of services provided by the company.",
        "fields": {
            "Name": "The name of the service table, which is displayed as the top header in the hero section.",
            "Labels": "The labels used in the service table, which provide context for each column.",
            "Rows": "The rows in the service table, which represent the different services provided by the company.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ServiceTable model reference": "/docs/model/servicetable/",
            "General app documentation": "/docs/app/tables/",
        },
    },
)
class ServiceTable(models.Model):
    name = CustomCharField(
        max_length=20,
        md_column_count=12,
        verbose_name="Table Name",
        help_text="Table Name",
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

    class Meta:
        verbose_name = "Service Table"
        verbose_name_plural = "Service Tables"


@receiver(post_save, sender=ServiceCompareRows)
def update_service_table(sender, instance, created, **kwargs):
    service_table, _ = ServiceTable.objects.get_or_create(name=instance.table_name)
    service_table.rows.add(instance)
    print("added")
