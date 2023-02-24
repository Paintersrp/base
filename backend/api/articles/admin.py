from django.contrib import admin
from django import forms
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Articles, Tags, User
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class ArticleForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        queryset=Tags.objects.all(),
        widget=admin.widgets.FilteredSelectMultiple("Tags", False),
    )

    class Meta:
        model = Articles
        fields = "__all__"


class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm
    actions = ["make_highlighted", "make_unhighlighted"]

    def save_formset(self, request, form, formset, change):
        tags = form.cleaned_data["tags"]
        form.instance.tags.set(tags)
        form.save()

    list_display = (
        "title",
        "author",
        "created_at",
        "updated_at",
        "thumbnail",
        "is_highlighted",
    )
    list_filter = ("created_at", "author", "tags", "is_highlighted")
    search_fields = ("title", "content")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "content",
                    "author",
                    "tags",
                    "image",
                    "is_highlighted",
                )
            },
        ),
        (
            "Metadata",
            {"classes": ("collapse",), "fields": ("created_at", "updated_at")},
        ),
    )

    def thumbnail(self, obj):
        if obj.image.url:
            return format_html('<img src="{}" width="50"/>'.format(obj.image.url))

    def get_queryset(self, request):
        queryset = super().get_queryset(request)

        if request.user.is_superuser:
            return queryset

        return queryset.filter(author=request.user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "author" and not request.user.is_superuser:
            kwargs["queryset"] = User.objects.filter(id=request.user.id)

        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_actions(self, request):
        actions = super().get_actions(request)

        if not request.user.is_superuser:
            del actions["delete_selected"]

        return actions

    def make_highlighted(self, request, queryset):
        queryset.update(is_highlighted=True)

    make_highlighted.short_description = "Mark selected articles as highlighted"

    def make_unhighlighted(self, request, queryset):
        queryset.update(is_highlighted=False)

    make_unhighlighted.short_description = "Mark selected articles as not highlighted"

    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser and not change:
            obj.author = request.user

        obj.save()


admin.site.register(Articles, ArticleAdmin)
admin.site.register(Tags)
