from django.apps import AppConfig
from django.apps import apps


class JobsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "jobs"
    verbose_name = "Jobs"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Contact Page": "/contact",
        "Job Posting Builder (WIP)": "/wip",
        "Jobs Admin Log": "/adminlog",
    }
