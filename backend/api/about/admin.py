from django.contrib import admin
from django.utils.html import format_html
from django import forms
from django.utils.translation import gettext_lazy as _
from .models import (
    AboutBlock,
    MissionStatement,
    CompanyHistory,
    Value,
    TeamMember,
    Skill,
    ContactInformation,
    Category,
    FAQ,
)

# Register your models here.
class CustomAboutBlockAdmin(admin.ModelAdmin):
    list_display = ("title", "image", "thumbnail_tag")
    search_fields = ("buttonText", "buttonLink")

    def thumbnail_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="75" height="50"/>'.format(obj.image.url)
            )
        return "-"

    thumbnail_tag.short_description = "Thumbnail"


class CustomCompanyHistoryAdmin(admin.ModelAdmin):
    fields = ["title", "body1", "body2", "body3"]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for field in self.fields:
            form.base_fields[field].required = False
            form.base_fields[field].blank = True
        return form


class CustomMissionStatementAdmin(admin.ModelAdmin):
    fields = ["title", "body1", "body2", "body3"]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for field in self.fields:
            form.base_fields[field].required = False
            form.base_fields[field].blank = True
        return form


class ArticleForm(forms.ModelForm):
    skills = forms.ModelMultipleChoiceField(
        queryset=Skill.objects.all(),
        widget=admin.widgets.FilteredSelectMultiple("Skills", False),
    )

    class Meta:
        model = TeamMember
        fields = "__all__"


class TeamMemberAdmin(admin.ModelAdmin):
    form = ArticleForm

    def save_formset(self, request, form, formset, change):
        skills = form.cleaned_data["skills"]
        form.instance.tags.set(skills)
        form.save()

    list_display = (
        "name",
        "bio",
        "linkedIn",
        "github",
        # "thumbnail",
        "twitter",
    )
    list_filter = ("name", "skills")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "bio",
                    "linkedIn",
                    "github",
                    "image",
                    "twitter",
                    "skills",
                    "role",
                )
            },
        ),
    )

    def thumbnail(self, obj):
        if obj.image.url:
            return format_html('<img src="{}" width="50"/>'.format(obj.image.url))

    def get_actions(self, request):
        actions = super().get_actions(request)

        if not request.user.is_superuser:
            del actions["delete_selected"]

        return actions


admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(ContactInformation)
admin.site.register(Category)
admin.site.register(FAQ)
admin.site.register(Value)
admin.site.register(Skill)
admin.site.register(CompanyHistory, CustomCompanyHistoryAdmin)
admin.site.register(MissionStatement, CustomMissionStatementAdmin)
admin.site.register(AboutBlock, CustomAboutBlockAdmin)
