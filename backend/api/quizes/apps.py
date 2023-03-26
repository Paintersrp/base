from django.apps import AppConfig
from django.urls import reverse_lazy


class QuizesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "quizes"
    verbose_name = "Quizes"
    visibility = True
    icon = "InfoIcon"
    links = {
        "Services Page": "/services",
        "Questionnaire Builder (WIP)": "/wip",
    }

    def ready(self):
        super().ready()
        from .models import Questionnaire

        questionnaires = Questionnaire.objects.all()
        for questionnaire in questionnaires:
            link_text = f"Questionnaire Analysis ({questionnaire.title})"
            link_url = f"/admin/questionnaire/analysis/{questionnaire.id}/"
            self.links[link_text] = link_url

        self.links["Quizes Admin Log"] = "/adminlog"
