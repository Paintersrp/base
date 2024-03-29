# Generated by Django 4.1.3 on 2023-04-06 15:54

import api.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("elements", "0027_element_subtype_alter_element_type_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="textelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[
                    ("Dense", "Dense"),
                    ("Light", "Light"),
                    ("Standard", "Standard"),
                ],
                default="Standard",
                help_text="Image Size",
                max_length=10,
                verbose_name="Image Size",
            ),
        ),
        migrations.AlterField(
            model_name="headerelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[
                    ("H1", "H1 (Page)"),
                    ("H2", "H2 (Page)"),
                    ("H3", "H3 (Section)"),
                    ("H4", "H4 (Section)"),
                    ("H5", "H5 (Content)"),
                    ("H6", "H6 (Content)"),
                ],
                default="H3",
                help_text="Header Type",
                max_length=2,
                verbose_name="Header Type",
            ),
        ),
        migrations.AlterField(
            model_name="imageelement",
            name="justify",
            field=api.customs.CustomCharField(
                choices=[("Left", "Left"), ("Center", "Center"), ("Right", "Right")],
                default="Center",
                help_text="Image Placement",
                max_length=10,
                verbose_name="Image Placement",
            ),
        ),
        migrations.AlterField(
            model_name="imageelement",
            name="type",
            field=api.customs.CustomCharField(
                choices=[("Small", "Small"), ("Medium", "Medium"), ("Full", "Full")],
                default="Medium",
                help_text="Image Size",
                max_length=6,
                verbose_name="Image Size",
            ),
        ),
        migrations.AlterField(
            model_name="textelement",
            name="text",
            field=api.customs.CustomTextField(
                blank=True,
                help_text="Text",
                max_length=3000,
                null=True,
                verbose_name="Text",
            ),
        ),
    ]
