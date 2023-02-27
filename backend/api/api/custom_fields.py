from django.db import models


class CustomCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        super().__init__(*args, **kwargs)


class CustomEmailField(models.EmailField):
    def __init__(self, *args, **kwargs):
        self.xs_column_count = kwargs.pop("xs_column_count", 12)
        self.md_column_count = kwargs.pop("md_column_count", 12)
        super().__init__(*args, **kwargs)
