# Generated by Django 4.1.3 on 2023-02-07 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("articles", "0002_alter_article_author_alter_article_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="is_highlighted",
            field=models.BooleanField(default=False),
        ),
    ]
