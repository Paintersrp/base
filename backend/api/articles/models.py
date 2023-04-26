from django.db import models
from authorization.models import User
from api.customs import *
from .metadata import *


class HighlightedArticlesManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_highlighted=True)


@metadata(**TAG_METADATA)
class Tags(models.Model):
    detail = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.detail

    def article_count(self):
        return self.article_set.count()

    article_count.short_description = "Article Count"

    class Meta:
        verbose_name = "Tags"
        verbose_name_plural = "Tags"


@metadata(**ARTICLE_METADATA)
class Articles(models.Model):
    title = CustomCharField(
        max_length=255,
    )
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(
        Tags,
        related_name="articles",
        verbose_name="Tags",
    )
    image = models.ImageField(
        blank=True,
        null=True,
        upload_to="article_images",
    )
    is_highlighted = models.BooleanField(default=False)

    highlighted_objects = HighlightedArticlesManager()
    objects = models.Manager()

    class Meta:
        verbose_name = "Articles"
        verbose_name_plural = "Articles"
