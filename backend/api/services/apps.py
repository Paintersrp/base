from django.apps import AppConfig


class ServicesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "services"

    def ready(self):
        from api.customs import BaseModel
        from api.signals import log_changes
        from django.db.models.signals import post_save

        print("Ready")

        post_save.connect(log_changes, sender=BaseModel)
