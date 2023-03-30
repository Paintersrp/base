from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class ContentBlock(models.Model):
    BLOCK_TYPES = (
        ("heading", "Heading"),
        ("paragraph", "Paragraph"),
        ("list", "List"),
        ("dictionary", "Dictionary"),
    )

    block_type = models.CharField(max_length=20, choices=BLOCK_TYPES)
    content = models.TextField()
    order = models.PositiveIntegerField(default=0)
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        abstract = True
        ordering = ("order",)


class Head(ContentBlock):
    LEVELS = (
        ("h1", "H1"),
        ("h2", "H2"),
        ("h3", "H3"),
        ("h4", "H4"),
        ("h5", "H5"),
        ("h6", "H6"),
    )
    level = models.CharField(max_length=2, choices=LEVELS)

    class Meta:
        verbose_name = "Head"
        verbose_name_plural = "Heads"


class Text(ContentBlock):
    class Meta:
        verbose_name = "Text"
        verbose_name_plural = "Text"


class List(ContentBlock):
    STYLES = (
        ("unordered", "Unordered"),
        ("ordered", "Ordered"),
    )
    style = models.CharField(max_length=10, choices=STYLES)

    class Meta:
        verbose_name = "List"
        verbose_name_plural = "Lists"


class Dictionary(ContentBlock):
    class Meta:
        verbose_name = "Dictionary"
        verbose_name_plural = "Dictionaries"


class Section(models.Model):
    name = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    def get_blocks_by_type(self, block_type):
        return self.content_object.filter(block_type=block_type)

    class Meta:
        verbose_name = "Section"
        verbose_name_plural = "Sections"



