from django.apps import AppConfig


class AboutConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "about"
    verbose_name = "About"
    visibility = True
    icon = "InfoIcon"
    links = {
        "About Page": "/about",
        "FAQ Builder (WIP)": "/wip",
        "About Admin Log": "/adminlog",
    }
