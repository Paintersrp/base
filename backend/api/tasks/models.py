from django.db import models
from authorization.models import User
from django.utils import timezone
from api.customs import *


@metadata(
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
    filter_options=["id", "title"],
    allowed=False,
)
class Task(models.Model):
    STATUS_CHOICES = (
        ("Incomplete", "Incomplete"),
        ("Complete", "Complete"),
    )
    PRIORITY_CHOICES = (
        ("None", "None"),
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="Incomplete"
    )
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default="None")
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_tasks", default=1
    )

    @property
    def completed_date(self):
        if self.status == "Done":
            return timezone.now()
        return None

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task"
        verbose_name_plural = "Tasks"


@metadata(
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
    filter_options=["id", "title"],
    allowed=False,
)
class TaskSection(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tasks = models.ManyToManyField(Task, related_name="get_task_lists")
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task Section"
        verbose_name_plural = "Task Sections"


@metadata(
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
    filter_options=["id", "title"],
    allowed=False,
)
class TaskList(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    sections = models.ManyToManyField(TaskSection, related_name="task_sections")
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task List"
        verbose_name_plural = "Task Lists"
