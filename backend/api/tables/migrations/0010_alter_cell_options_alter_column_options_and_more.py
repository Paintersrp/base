# Generated by Django 4.1.3 on 2023-04-10 19:31

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tables", "0009_row_name"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="cell",
            options={
                "ordering": ["id"],
                "verbose_name": "Cell",
                "verbose_name_plural": "Cells",
            },
        ),
        migrations.AlterModelOptions(
            name="column",
            options={
                "ordering": ["id"],
                "verbose_name": "Column",
                "verbose_name_plural": "Columns",
            },
        ),
        migrations.AlterModelOptions(
            name="row",
            options={
                "ordering": ["id"],
                "verbose_name": "Row",
                "verbose_name_plural": "Rows",
            },
        ),
        migrations.AlterModelOptions(
            name="table",
            options={
                "ordering": ["id"],
                "verbose_name": "Table",
                "verbose_name_plural": "Tables",
            },
        ),
        migrations.AlterField(
            model_name="row",
            name="name",
            field=api.customs.CustomCharField(
                blank=True,
                db_index=True,
                help_text="Row Name",
                max_length=50,
                null=True,
                verbose_name="Row Name",
            ),
        ),
    ]
