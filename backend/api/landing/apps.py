from django.apps import AppConfig


class LandingConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "landing"
    verbose_name = "Landing"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Landing": "/",
        "Landing Admin Log": "/adminlog",
    }
