from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import *
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "first_name", "last_name", "salt", "is_staff")
    search_fields = ("username", "email")
    actions = ["delete_selected"]

    def delete_selected(self, request, queryset):
        for user in queryset:
            user.delete()

    delete_selected.short_description = _("Delete selected users")


class CustomThemeSettingsAdmin(admin.ModelAdmin):
    list_display = ("user", "primary_color", "secondary_color", "background_color")


admin.site.register(ThemeSettings, CustomThemeSettingsAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(TokenBlacklist)
