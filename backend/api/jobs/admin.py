from django.contrib import admin
from .models import *


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

class ApplicationAdmin(admin.ModelAdmin):
  list_display = ['first_name', 'last_name', 'email', 'phone', 'created_at', 'city', 'zipcode']


admin.site.register(Application, ApplicationAdmin)
admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(Responsibilities, ResponsibilitiesAdmin)
admin.site.register(Requirement, RequirementAdmin)
