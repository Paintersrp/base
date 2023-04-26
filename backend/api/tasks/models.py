from django.db import models
from authorization.models import User
from django.utils import timezone
from api.customs import *
from .metadata import *


@metadata(**TASK_METADATA)
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

    title = CustomCharField(
        max_length=100,
        verbose_name="Task Title",
        help_text="Task Title",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    description = CustomTextField(
        max_length=500,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    status = CustomCharField(
        max_length=20,
        verbose_name="Task Status",
        help_text="Task Status",
        md_column_count=6,
        choices=STATUS_CHOICES,
        default="Incomplete",
    )
    priority = CustomCharField(
        max_length=10,
        verbose_name="Task Priority",
        help_text="Task Priority",
        md_column_count=6,
        choices=PRIORITY_CHOICES,
        default="None",
    )
    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def completed_on(self):
        if self.status == "Complete":
            return timezone.now()
        return None

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task"
        verbose_name_plural = "Tasks"


@metadata(**TASK_SECTION_METADATA)
class TaskSection(models.Model):
    title = CustomCharField(
        max_length=100,
        verbose_name="Section Title",
        help_text="Section Title",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )
    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )
    order = CustomPositiveIntegerField(
        default=0,
        verbose_name="Order within List",
        md_column_count=6,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tasks = models.ManyToManyField(Task, related_name="get_task_lists")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task Section"
        verbose_name_plural = "Task Sections"


@metadata(**TASK_LIST_METADATA)
class TaskList(models.Model):
    title = CustomCharField(
        max_length=100,
        verbose_name="Task List Title",
        help_text="Task List Title",
        md_column_count=6,
        db_index=True,
        default="Placeholder",
    )
    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )
    sections = models.ManyToManyField(TaskSection, related_name="task_sections")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["id"]
        verbose_name = "Task List"
        verbose_name_plural = "Task Lists"
