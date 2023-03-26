from django.apps import AppConfig


class AuthorizationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "authorization"
    verbose_name = "Authorization"
    visibility = True
    icon = "InfoIcon"
    links = {
        "User Creator (WIP)": "/wip",
        "Authorization Admin Log": "/adminlog",
    }
