from django.contrib import admin
from .models import *


class ServiceTableLabelsAdmin(admin.ModelAdmin):
    list_display = [
        "service_tier1",
        "service_tier2",
        "service_tier3",
    ]


class ServiceCompareRowsAdmin(admin.ModelAdmin):
    list_display = [
        "detail",
        "tier1_value",
        "tier2_value",
        "tier3_value",
    ]


admin.site.register(ServiceCompareRows, ServiceCompareRowsAdmin)
admin.site.register(ServiceTableLabels, ServiceTableLabelsAdmin)
admin.site.register(ServiceTable)
