from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import (
    HeroBlock,
    Feature,
    PricingPlan,
    SupportedSites,
    Item,
    TitleBlock,
    Testimonial,
    Process,
)
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
                    "supported_sites",
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


class CustomProcessAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "icon")


class CustomTestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "heading", "text", "thumbnail")

    def thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50"/>'.format(obj.image.url)
            )
        return "-"

    thumbnail.short_description = "Thumbnail"


class CustomTitleBlockAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "subtitle", "alignment", "show_divider")
    list_filter = ("alignment", "show_divider")
    search_fields = ("name", "title", "subtitle")


admin.site.register(Feature)
admin.site.register(Testimonial, CustomTestimonialAdmin)
admin.site.register(TitleBlock, CustomTitleBlockAdmin)
admin.site.register(Item, CustomItemAdmin)
admin.site.register(Process, CustomProcessAdmin)
admin.site.register(SupportedSites)
admin.site.register(PricingPlan, CustomPricingPlanAdmin)
admin.site.register(HeroBlock, CustomHeroBlockAdmin)
