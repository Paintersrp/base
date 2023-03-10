# Generated by Django 4.1.3 on 2023-02-27 15:58

import api.customs
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0016_alter_aboutblock_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="aboutblock",
            name="image",
            field=models.ImageField(upload_to="about", verbose_name="Image"),
        ),
        migrations.AlterField(
            model_name="aboutblock",
            name="title",
            field=api.customs.CustomCharField(max_length=200, verbose_name="Title"),
        ),
        migrations.AlterField(
            model_name="category",
            name="name",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Category"),
        ),
        migrations.AlterField(
            model_name="companyhistory",
            name="body",
            field=models.TextField(max_length=10000, null=True, verbose_name="Body"),
        ),
        migrations.AlterField(
            model_name="companyhistory",
            name="title",
            field=api.customs.CustomCharField(max_length=200, verbose_name="Title"),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="address",
            field=models.TextField(verbose_name="Address"),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="email",
            field=api.customs.CustomEmailField(max_length=254, verbose_name="Email"),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="facebook",
            field=api.customs.CustomCharField(
                max_length=100, null=True, verbose_name="Facebook"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="friday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Friday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="instagram",
            field=api.customs.CustomCharField(
                max_length=100, null=True, verbose_name="Instagram"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="linkedin",
            field=api.customs.CustomCharField(
                max_length=100, null=True, verbose_name="LinkedIn"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="monday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Monday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="phone",
            field=api.customs.CustomCharField(max_length=20, verbose_name="Phone"),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="saturday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Saturday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="sunday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Sunday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="thursday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Thursday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="tuesday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Tuesday"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="twitter",
            field=api.customs.CustomCharField(
                max_length=100, null=True, verbose_name="Twitter"
            ),
        ),
        migrations.AlterField(
            model_name="contactinformation",
            name="wednesday",
            field=api.customs.CustomCharField(
                max_length=40, null=True, verbose_name="Wednesday"
            ),
        ),
        migrations.AlterField(
            model_name="faq",
            name="answer",
            field=models.TextField(verbose_name="Answer"),
        ),
        migrations.AlterField(
            model_name="faq",
            name="question",
            field=models.TextField(verbose_name="Question"),
        ),
        migrations.AlterField(
            model_name="missionstatement",
            name="body",
            field=models.TextField(max_length=10000, null=True, verbose_name="Body"),
        ),
        migrations.AlterField(
            model_name="missionstatement",
            name="title",
            field=api.customs.CustomCharField(max_length=200, verbose_name="Title"),
        ),
        migrations.AlterField(
            model_name="skill",
            name="name",
            field=api.customs.CustomCharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="bio",
            field=models.TextField(verbose_name="Bio"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="github",
            field=api.customs.CustomCharField(max_length=100, verbose_name="GitHub"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="image",
            field=models.ImageField(upload_to="about_members", verbose_name="Image"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="linkedIn",
            field=api.customs.CustomCharField(max_length=100, verbose_name="LinkedIn"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="name",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Name"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="role",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Role"),
        ),
        migrations.AlterField(
            model_name="teammember",
            name="twitter",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Twitter"),
        ),
        migrations.AlterField(
            model_name="value",
            name="icon",
            field=api.customs.CustomCharField(max_length=40, verbose_name="Icon"),
        ),
        migrations.AlterField(
            model_name="value",
            name="title",
            field=api.customs.CustomCharField(max_length=100, verbose_name="Title"),
        ),
    ]