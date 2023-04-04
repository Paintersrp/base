from django.contrib import admin
from .models import *


class CustomComponentAdmin(admin.ModelAdmin):
    list_display = ("component_name", "query_set", "order")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "component_name",
                    "query_set",
                    "order",
                    "props",
                )
            },
        ),
    )


# Register your models here.
admin.site.register(Component, CustomComponentAdmin)
admin.site.register(App)
admin.site.register(Page)
admin.site.register(PageSet)
admin.site.register(PageObj)
admin.site.register(ComponentObj)
admin.site.register(ComponentCategory)
