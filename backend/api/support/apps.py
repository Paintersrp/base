from django.apps import AppConfig


class SupportConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "support"
    verbose_name = "Support"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Support Page (WIP)": "/support",
        "Messages": "/admin/messages",
        "Support Admin Log": "/adminlog",
    }
