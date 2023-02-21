from django.contrib import admin
from .models import Message


class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "email",
        "subject",
        "message",
        "created_at",
        "is_read",
        "is_replied",
        "is_archived",
    ]


admin.site.register(Message, MessageAdmin)
