from django.apps import AppConfig


class TablesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "tables"
    verbose_name = "Tables"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Table Builder (WIP)": "/wip",
        "Tables Admin Log": "/adminlog",
    }
