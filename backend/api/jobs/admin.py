from django.contrib import admin
from .models import Jobs


class JobsAdmin(admin.ModelAdmin):
    list_display = ["Position", "created_at"]


admin.site.register(Jobs, JobsAdmin)
