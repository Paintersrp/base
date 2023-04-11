from django.apps import AppConfig


class FaqsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "faqs"
    verbose_name = "FAQs"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Table Builder (WIP)": "/wip",
        "Tables Admin Log": "/adminlog",
    }
