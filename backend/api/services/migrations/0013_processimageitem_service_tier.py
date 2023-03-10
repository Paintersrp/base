# Generated by Django 4.1.3 on 2023-03-07 00:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0022_remove_servicetier_image_two_alter_servicetier_image"),
        ("services", "0012_processimageitem"),
    ]

    operations = [
        migrations.AddField(
            model_name="processimageitem",
            name="service_tier",
            field=models.ForeignKey(
                default=3,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="process_images",
                to="landing.servicetier",
            ),
        ),
    ]