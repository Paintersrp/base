from django.db import models
from authorization.models import User
from django.utils import timezone
from api.customs import *


@metadata(
    autoform_label="Task",
    long_description="This model represents a task that can be assigned to users.",
    short_description="Model for tasks",
    pages_associated={
        "Tasks": "/tasks",
        "Task Categories": "/task-categories",
    },
    include_preview=True,
    icon="TaskIcon",
    icon_class=None,
    slug="tasks",
    tags=["Tasks", "Task Categories"],
    related_components=["TaskList", "TaskDetail"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a task that can be assigned to users.",
        "fields": {
            "Title": "The title of the task.",
            "Description": "A description of the task.",
            "Status": "The current status of the task.",
            "Priority": "The priority of the task.",
            "Author": "The user who created the task.",
            "Created At": "The date the task was created.",
            "Updated At": "The date the task was last updated.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "Task model reference": "/docs/task/",
        },
    },
    allowed=True,
    filter_options=["title", "status", "priority", "author"],
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
    autoform_label="Task Section",
    long_description="This model represents a section that contains tasks.",
    short_description="Model for task sections",
    pages_associated={
        "Task List": "/task-list",
        "Dashboard": "/dashboard",
    },
    include_preview=False,
    icon="TaskSectionIcon",
    icon_class=None,
    slug="task-sections",
    tags=["Tasks", "Sections"],
    related_components=["TaskList"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a section that contains tasks.",
        "fields": {
            "Section Title": "The title of the section.",
            "Description": "The description of the section.",
            "Author": "The author of the section.",
            "Created At": "The date and time when the section was created.",
            "Updated At": "The date and time when the section was last updated.",
            "Tasks": "The tasks in the section.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "TaskSection model reference": "/docs/tasksection/",
        },
    },
    allowed=True,
    filter_options=["author", "created_at"],
)
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


@metadata(
    autoform_label="Task List",
    long_description="This model represents a list of tasks.",
    short_description="Model for task lists",
    pages_associated={
        "Tasks": "/tasks",
        "Task Lists": "/task-lists",
    },
    include_preview=True,
    icon="TaskListIcon",
    icon_class=None,
    slug="task-lists",
    tags=["Tasks", "Lists"],
    related_components=["TaskListDetail", "TaskListCreate", "TaskListUpdate"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a list of tasks.",
        "fields": {
            "Title": "The title of the task list.",
            "Description": "A description of the task list.",
            "Author": "The author of the task list.",
            "Sections": "The sections containing tasks associated with the task list.",
            "Created At": "The date the task list was created.",
            "Updated At": "The date the task list was last updated.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "TaskList model reference": "/docs/tasklist/",
        },
    },
    allowed=True,
    filter_options=["title"],
)
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
