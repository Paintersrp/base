from django.contrib import admin
from django import forms
from .models import JobPosting, Requirement, Responsibilities
from django.forms import CheckboxSelectMultiple
from django.urls import reverse
from django.utils.html import format_html
from django.forms import ModelForm, inlineformset_factory


class RequirementAdmin(admin.ModelAdmin):
    list_display = [
        "detail",
    ]


class ResponsibilitiesAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "detail",
    ]


class JobPostingAdmin(admin.ModelAdmin):
    list_display = [
        "position",
        "location",
        "type",
        "who_we_are",
        "why_apply",
        "looking_for",
        "created_at",
    ]

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "position",
                    "location",
                    "type",
                    "who_we_are",
                    "why_apply",
                    "looking_for",
                    "requirements",
                    "responsibilities",
                )
            },
        ),
    )


admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(Responsibilities, ResponsibilitiesAdmin)
admin.site.register(Requirement, RequirementAdmin)
