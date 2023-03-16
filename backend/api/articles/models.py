from django.db import models
from authorization.models import User
from api.customs import *
from auditlog.registry import auditlog


@custom_metadata(
    autoform_label="Manage Article Tag Objects",
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "News": "/news",
    },
    include_preview=False,
)
class Tags(models.Model):
    name = CustomCharField(
        max_length=255,
        md_column_count=10,
        verbose_name="Tag Name",
        help_text="Help Text Placeholder",
    )

    def __str__(self):
        return self.name

    def article_count(self):
        return self.article_set.count()

    article_count.short_description = "Article Count"

    class Meta:
        verbose_name = "Tags"
        verbose_name_plural = "Tags"


@custom_metadata(
    autoform_label="Manage Article Objects",
    autoform_description="Description Placeholder",
    pages_associated={
        "Landing": "/",
        "News": "/news",
    },
    include_preview=False,
)
class Articles(models.Model):
    title = CustomCharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tags, related_name="articles")
    image = models.ImageField(blank=True, null=True, upload_to="article_images")
    is_highlighted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Articles"
        verbose_name_plural = "Articles"
