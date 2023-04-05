from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import *
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class CustomHeroBlockAdmin(admin.ModelAdmin):
    list_display = ("title", "heading", "text", "buttonText")


class CustomServiceTierAdmin(admin.ModelAdmin):
    list_display = ("service_title", "price", "image")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "service_title",
                    "price",
                    "image",
                    "features",
                    "bestFor",
                    "guarantee",
                    "supported_sites",
                )
            },
        ),
    )


class CustomProcessAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "icon")


class CustomTitleBlockAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "subtitle", "alignment", "show_divider")
    list_filter = ("alignment", "show_divider")
    search_fields = ("name", "title", "subtitle")


admin.site.register(Hero)
admin.site.register(LatestNews)
admin.site.register(Processes)
admin.site.register(Feature)
admin.site.register(TitleBlock, CustomTitleBlockAdmin)
admin.site.register(Process, CustomProcessAdmin)
admin.site.register(SupportedSites)
admin.site.register(ServiceTier, CustomServiceTierAdmin)
admin.site.register(HeroBlock, CustomHeroBlockAdmin)
