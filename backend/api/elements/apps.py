from django.apps import AppConfig


class ElementsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "elements"
    verbose_name = "Elements"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Landing": "/",
    }

    def ready(self):
        import elements.signals

        print("Elements app ready!")
