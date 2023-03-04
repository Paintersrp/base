from django.contrib import admin
from .models import JobPosting, Requirement, Responsibilities


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
        "created_at",
        "location",
        "type",
        "tagline",
        "filled",
    ]

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "position",
                    "location",
                    "type",
                    "tagline",
                    "who_we_are",
                    "why_apply",
                    "looking_for",
                    "requirements",
                    "responsibilities",
                    "filled",
                )
            },
        ),
    )


admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(Responsibilities, ResponsibilitiesAdmin)
admin.site.register(Requirement, RequirementAdmin)
