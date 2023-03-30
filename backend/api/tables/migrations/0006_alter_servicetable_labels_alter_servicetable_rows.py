# Generated by Django 4.1.3 on 2023-03-26 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("tables", "0005_alter_servicetable_labels"),
    ]

    operations = [
        migrations.AlterField(
            model_name="servicetable",
            name="labels",
            field=models.OneToOneField(
                blank=True,
                help_text="Table Name",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="service_table",
                to="tables.servicetablelabels",
                verbose_name="Table Labels",
            ),
        ),
        migrations.AlterField(
            model_name="servicetable",
            name="rows",
            field=models.ManyToManyField(
                blank=True,
                help_text="Table Rows",
                related_name="service_tables",
                to="tables.servicecomparerows",
                verbose_name="Table Rows",
            ),
        ),
    ]