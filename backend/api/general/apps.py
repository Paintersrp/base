from django.apps import AppConfig


class GeneralConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "general"
    verbose_name = "General"
    visibility = True
    icon = "InfoIcon"
    links = {
        "SEO Builder (WIP)": "/wip",
        "General Admin Log": "/adminlog",
    }
