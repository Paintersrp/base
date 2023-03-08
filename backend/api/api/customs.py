from django.db import models
from django.utils import timezone


class CustomCharField(models.CharField):
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
        super().__init__(*args, **kwargs)


class CustomDecimalField(models.DecimalField):
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
    md_column_count = 6
    xs_column_count = 12

    def __init__(self, *args, **kwargs):
        self.md_column_count = kwargs.pop("md_column_count", self.md_column_count)
        self.xs_column_count = kwargs.pop("xs_column_count", self.xs_column_count)
        self.justify = kwargs.pop("justify", "left")
        super().__init__(*args, **kwargs)


class BaseModel(models.Model):
    class Meta:
        abstract = True
