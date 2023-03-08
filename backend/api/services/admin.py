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


class ServiceTableLabelsAdmin(admin.ModelAdmin):
    list_display = ["service_tier1", "service_tier2", "service_tier3"]


class ServiceCompareRowsAdmin(admin.ModelAdmin):
    list_display = ["feature", "tier1_value", "tier2_value", "tier3_value"]


admin.site.register(ServiceCompareRows, ServiceCompareRowsAdmin)
admin.site.register(ServiceTableLabels, ServiceTableLabelsAdmin)
admin.site.register(ProcessTextItem, ProcessTextItemAdmin)
admin.site.register(ProcessImageItem, ProcessImageItemAdmin)
admin.site.register(Benefits)
