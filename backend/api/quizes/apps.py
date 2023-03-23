from django.apps import AppConfig


class QuizesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "quizes"
    verbose_name = "Quizes"
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Questionnaire Builder (WIP)": "/wip",
        "Questionnaire Analysis (WIP)": "/questionnaire/analysis",
        "Quizes Admin Log": "/adminlog",
    }
