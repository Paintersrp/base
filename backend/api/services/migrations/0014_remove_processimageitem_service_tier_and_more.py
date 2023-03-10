# Generated by Django 4.1.3 on 2023-03-07 00:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0022_remove_servicetier_image_two_alter_servicetier_image"),
        ("services", "0013_processimageitem_service_tier"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="processimageitem",
            name="service_tier",
        ),
        migrations.AddField(
            model_name="processimageitem",
            name="servicetier",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="process_images",
                to="landing.servicetier",
                verbose_name="Service Tier",
            ),
        ),
    ]