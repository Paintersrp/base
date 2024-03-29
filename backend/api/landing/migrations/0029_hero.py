# Generated by Django 4.1.3 on 2023-03-28 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contact", "0005_alter_contactinformation_address_and_more"),
        ("landing", "0028_alter_titleblock_alignment"),
    ]

    operations = [
        migrations.CreateModel(
            name="Hero",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("contacts", models.ManyToManyField(to="contact.contactinformation")),
                (
                    "hero_block",
                    models.ForeignKey(
                        limit_choices_to={"id": 1},
                        on_delete=django.db.models.deletion.CASCADE,
                        to="landing.heroblock",
                    ),
                ),
                ("socials", models.ManyToManyField(to="contact.socials")),
            ],
        ),
    ]
