from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import HeroBlock, Feature, PricingPlan, SupportedSites, Tile, Item
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class CustomHeroBlockAdmin(admin.ModelAdmin):
    list_display = ("title", "heading", "text", "buttonText")


class CustomPricingPlanAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "image")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "price",
                    "image",
                    "features",
                    "bestFor",
                    "guarantee",
                    "supportedsites",
                )
            },
        ),
    )


class CustomItemAdmin(admin.ModelAdmin):
    list_display = ("buttonText", "buttonLink", "image", "thumbnail_tag")
    search_fields = ("buttonText", "buttonLink")

    def thumbnail_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="75" height="50"/>'.format(obj.image.url)
            )
        return "-"

    thumbnail_tag.short_description = "Thumbnail"


class CustomTileAdmin(admin.ModelAdmin):
    list_display = ("title", "subheader", "icon")


admin.site.register(Feature)
admin.site.register(Item, CustomItemAdmin)
admin.site.register(Tile, CustomTileAdmin)
admin.site.register(SupportedSites)
admin.site.register(PricingPlan, CustomPricingPlanAdmin)
admin.site.register(HeroBlock, CustomHeroBlockAdmin)
