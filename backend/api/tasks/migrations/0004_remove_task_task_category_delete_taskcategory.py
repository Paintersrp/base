# Generated by Django 4.1.3 on 2023-04-16 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0003_alter_tasklist_description_tasksection_tasklist2"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="task",
            name="task_category",
        ),
        migrations.DeleteModel(
            name="TaskCategory",
        ),
    ]
