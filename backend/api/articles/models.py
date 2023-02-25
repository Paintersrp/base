from django.db import models
from authorization.models import User

# Create your models here.
class Tags(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

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
