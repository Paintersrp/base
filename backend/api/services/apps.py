from django.apps import AppConfig


class ServicesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "services"
    verbose_name = "Services"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Service Tier Creator (WIP)": "/wip",
        "Service Admin Log": "/adminlog",
    }

    def ready(self):
        from api.customs import BaseModel
        from api.signals import log_changes
        from django.db.models.signals import post_save

        post_save.connect(log_changes, sender=BaseModel)
