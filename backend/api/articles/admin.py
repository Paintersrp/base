from django.contrib import admin
from django import forms
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Article, Tag, User
from django.contrib.admin import AdminSite

admin_site = AdminSite(name="admin")
admin_site.site_header = "EDGELORDS"


class ArticleForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        queryset=Tag.objects.all(),
        widget=admin.widgets.FilteredSelectMultiple("Tags", False),
    )

    class Meta:
        model = Article
        fields = "__all__"


class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm

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
    )
    list_filter = ("created_at", "author", "tags")
    search_fields = ("title", "content")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("title", "content", "author", "tags", "image")}),
        (
            "Metadata",
            {"classes": ("collapse",), "fields": ("created_at", "updated_at")},
        ),
    )

    def thumbnail(self, obj):
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

    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser and not change:
            obj.author = request.user

        obj.save()


admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag)
