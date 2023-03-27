from django.apps import AppConfig


class ArticlesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "articles"
    verbose_name = "Articles"
    visibility = True
    icon = "InfoIcon"
    links = {
        "News Page": "/articles",
        "Article Creator (WIP)": "/wip",
        "Article Admin Log": "/adminlog",
    }
