TASK_METADATA = {
    "autoform_label": "Task",
    "long_description": "This model represents a task that can be assigned to users.",
    "short_description": "Model for tasks",
    "pages_associated": {
        "Tasks": "/tasks",
        "Task Categories": "/task-categories",
    },
    "include_preview": True,
    "icon": "TaskIcon",
    "icon_class": None,
    "slug": "tasks",
    "tags": ["Tasks", "Task Categories"],
    "related_components": ["TaskList", "TaskDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "allowed": True,
    "filter_options": ["title", "status", "priority", "author"],
}


TASK_SECTION_METADATA = {
    "autoform_label": "Task Section",
    "long_description": "This model represents a section that contains tasks.",
    "short_description": "Model for task sections",
    "pages_associated": {
        "Task List": "/task-list",
        "Dashboard": "/dashboard",
    },
    "include_preview": False,
    "icon": "TaskSectionIcon",
    "icon_class": None,
    "slug": "task-sections",
    "tags": ["Tasks", "Sections"],
    "related_components": ["TaskList"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "allowed": True,
    "filter_options": ["author", "created_at"],
}


TASK_LIST_METADATA = {
    "autoform_label": "Task List",
    "long_description": "This model represents a list of tasks.",
    "short_description": "Model for task lists",
    "pages_associated": {
        "Tasks": "/tasks",
        "Task Lists": "/task-lists",
    },
    "include_preview": True,
    "icon": "TaskListIcon",
    "icon_class": None,
    "slug": "task-lists",
    "tags": ["Tasks", "Lists"],
    "related_components": ["TaskListDetail", "TaskListCreate", "TaskListUpdate"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "allowed": True,
    "filter_options": ["title"],
}
