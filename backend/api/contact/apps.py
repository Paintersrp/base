from django.apps import AppConfig


class ContactConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "contact"
    verbose_name = "Contact"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Contact Page": "/contact",
        "Contact Admin Log": "/adminlog",
    }
