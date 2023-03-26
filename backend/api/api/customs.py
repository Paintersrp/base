from django.db import models
from django.utils import timezone


def custom_metadata(
    autoform_label=None,
    long_description=None,
    short_description=None,
    pages_associated=None,
    include_preview=False,
    icon=None,
    icon_class=None,
    slug=None,
    tags=None,
    related_components=None,
    visibility=True,
    access_level="All",
    info_dump={"text": ""},
):
    def decorator(cls):
        cls._meta.autoform_label = autoform_label
        cls._meta.long_description = long_description
        cls._meta.short_description = short_description
        cls._meta.pages_associated = pages_associated
        cls._meta.include_preview = include_preview
        cls._meta.icon = icon
        cls._meta.icon_class = icon_class
        cls._meta.slug = slug
        cls._meta.tags = tags
        cls._meta.related_components = related_components
        cls._meta.visibility = visibility
        cls._meta.access_level = access_level
        cls._meta.info_dump = info_dump
        return cls

    return decorator


class CustomCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomSlugField(models.SlugField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomEmailField(models.EmailField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomTextField(models.TextField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        self.markdown = kwargs.pop("markdown", "false")
        self.min_rows = kwargs.pop("min_rows", 6)
        super().__init__(*args, **kwargs)


class CustomDecimalField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomPositiveIntegerField(models.PositiveIntegerField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomBooleanField(models.BooleanField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class CustomForeignKeyField(models.ForeignKey):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        super().__init__(*args, **kwargs)


class CustomURLField(models.URLField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        super().__init__(*args, **kwargs)


class CustomManyToManyField(models.ManyToManyField):
    def __init__(self, *args, **kwargs):
        self.md_column_count = kwargs.pop("md_column_count", 12)
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class BaseModel(models.Model):
    class Meta:
        abstract = True
