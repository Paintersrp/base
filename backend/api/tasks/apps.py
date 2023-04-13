from django.apps import AppConfig


class TasksConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "tasks"
    verbose_name = "Tasks"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Table Builder (WIP)": "/wip",
        "Tables Admin Log": "/adminlog",
    }
