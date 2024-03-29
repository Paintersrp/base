# Generated by Django 4.1.3 on 2023-04-03 21:55

import api.customs
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contact", "0008_alter_contactinformation_set_name_and_more"),
        ("pages", "0029_alter_componentobj_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="app",
            name="contact_set",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="contact.contact",
                verbose_name="App Contact Set",
            ),
        ),
        migrations.AlterField(
            model_name="componentobj",
            name="category",
            field=api.customs.CustomForeignKeyField(
                blank=True,
                limit_choices_to={
                    "name__in": (
                        "Contact",
                        "Landing",
                        "About",
                        "Heading",
                        "Card",
                        "Text",
                    )
                },
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="components",
                to="pages.componentcategory",
                verbose_name="Component Category",
            ),
        ),
    ]
