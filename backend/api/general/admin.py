from django.contrib import admin
from .models import *


class HeaderAdmin(admin.ModelAdmin):
    list_display = ["page", "title", "description", "keywords", "image", "url"]


admin.site.register(Header, HeaderAdmin)
