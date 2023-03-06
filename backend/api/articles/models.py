from django.db import models
from authorization.models import User
from api.customs import CustomCharField
from auditlog.registry import auditlog


class Tags(models.Model):
    name = CustomCharField(max_length=255, md_column_count=10, verbose_name="Tag Name")

    def __str__(self):
        return self.name

    def article_count(self):
        return self.article_set.count()

    article_count.short_description = "Article Count"

    class Meta:
        verbose_name = "Tags"
        verbose_name_plural = "Tags"


class Articles(models.Model):
    title = models.CharField(max_length=255)
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


auditlog.register(Tags)
auditlog.register(Articles)
