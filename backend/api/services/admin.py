from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Benefits
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"

admin.site.register(Benefits)
