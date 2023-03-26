from django.contrib import admin
from .models import *


class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "email",
        "subject",
        "message",
        "created_at",
        "is_read",
        "is_archived",
    ]


class SubscriberAdmin(admin.ModelAdmin):
    list_display = [
        "subscribed_on",
        "email",
    ]


admin.site.register(Subscribers, SubscriberAdmin)
admin.site.register(Messages, MessageAdmin)
