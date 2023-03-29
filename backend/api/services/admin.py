from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import *
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class ProcessTextItemAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "icon"]


class ProcessImageItemAdmin(admin.ModelAdmin):
    list_display = ["id", "image"]


admin.site.register(ProcessTextItem, ProcessTextItemAdmin)
admin.site.register(ProcessImageItem, ProcessImageItemAdmin)
admin.site.register(Benefits)
admin.site.register(Quiz)
