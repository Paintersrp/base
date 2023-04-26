from django.db import models
from api.customs import *
from api.utils import *
from authorization.models import User
from django.contrib.contenttypes.models import ContentType
from django.apps import apps
from contact.models import Contact
from django.urls import reverse
from general.models import Header
from .metadata import *


def allowed_content_types():
    return {"model__in": ComponentObj.allowed_models()}


@metadata(**COMPONENT_CATEGORY_METADATA)
class ComponentCategory(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Category Name",
        help_text="Category Name",
        md_column_count=12,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Component Category"
        verbose_name_plural = "Component Category"


@metadata(**COMPONENT_METADATA)
class ComponentObj(models.Model):
    name = CustomCharField(
        max_length=50,
        verbose_name="Component Name",
        help_text="Component Name",
        md_column_count=6,
        db_index=True,
    )
    category = CustomForeignKeyField(
        ComponentCategory,
        on_delete=models.CASCADE,
        verbose_name="Component Category",
        related_name="components",
        limit_choices_to={
            "name__in": ComponentCategory.objects.all().values_list("name", flat=True)
        },
        null=True,
        blank=True,
        md_column_count=6,
        db_index=True,
    )
    order = CustomPositiveIntegerField(
        default=0,
        verbose_name="Page Appearance Order",
        md_column_count=6,
    )
    content = CustomForeignKeyField(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to=allowed_content_types,
        verbose_name="Data Model",
        md_column_count=4,
        related_query_name="data",
    )
    query_params = CustomJSONField(
        default=dict,
        blank=True,
        verbose_name="Query Parameters",
        help_text="Query parameters to filter the data source",
        md_column_count=8,
    )

    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )

    active = CustomBooleanField(
        default=True,
        verbose_name="Active",
        help_text="Active Status",
        justify="right",
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    @staticmethod
    def allowed_models():
        return [
            m.__name__.lower()
            for m in apps.get_models()
            if hasattr(m._meta, "allowed") and m._meta.allowed
        ]

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["category", "name"]
        verbose_name = "Components2"
        verbose_name_plural = "Components2"


@metadata(**PAGE_METADATA)
class PageObj(models.Model):
    ACCESS_CHOICES = (
        ("public", "Public"),
        ("private", "Private"),
        ("protected", "Protected"),
        ("admin", "Admin"),
    )

    page_name = CustomCharField(
        max_length=50,
        verbose_name="Page Name",
        help_text="Page Name",
        md_column_count=6,
        db_index=True,
    )
    components = models.ManyToManyField(
        ComponentObj,
        verbose_name="Components",
        help_text="Components",
    )
    slug = CustomCharField(
        max_length=100,
        unique=True,
        verbose_name="URL Slug",
        help_text="URL Slug",
        md_column_count=6,
        blank=True,
        null=True,
        db_index=True,
    )
    access = CustomCharField(
        max_length=10,
        choices=ACCESS_CHOICES,
        md_column_count=6,
        verbose_name="Access Level",
        help_text="Access Level",
        default="Public",
    )

    description = CustomTextField(
        max_length=300,
        md_column_count=6,
        verbose_name="Description",
        help_text="Description (Optional)",
        min_rows=3,
        blank=True,
        null=True,
    )

    seo_data = CustomForeignKeyField(
        Header,
        on_delete=models.CASCADE,
        verbose_name="SEO Data",
        default=3,
        md_column_count=6,
    )

    featured = CustomBooleanField(
        default=True,
        verbose_name="Featured",
        help_text="Featured Status",
        justify="right",
        md_column_count=6,
    )

    author = CustomForeignKeyField(
        User,
        on_delete=models.SET_DEFAULT,
        default=1,
        verbose_name="Author",
        related_query_name="author",
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def get_absolute_url(self):
        return reverse("pageobj", kwargs={"slug": self.slug})

    def get_components(self):
        return self.components.all()

    def __str__(self):
        return self.page_name

    class Meta:
        ordering = ["page_name", "access"]
        verbose_name = "Pages2"
        verbose_name_plural = "Pages2"


@metadata(**PAGE_SET_METADATA)
class PageSet(models.Model):
    set_name = CustomCharField(
        max_length=50,
        verbose_name="Set Name",
        help_text="Set Name",
    )
    pages = models.ManyToManyField(
        PageObj,
        verbose_name="Pages",
        help_text="Pages in this set",
    )

    def __str__(self):
        return self.set_name

    class Meta:
        ordering = ["set_name"]
        verbose_name = "Page Set"
        verbose_name_plural = "Page Sets"


@metadata(**APP_METADATA)
class App(models.Model):
    NAV_CHOICES = (
        ("Standard", "Standard"),
        ("DrawerOnly", "DrawerOnly"),
        ("TopBarOnly", "TopBarOnly"),
    )
    FOOTER_CHOICES = (
        ("Standard", "Standard"),
        ("Minimal", "Minimal"),
    )
    FAB_CHOICES = (
        ("Standard", "Standard"),
        ("None", "None"),
    )
    ERROR_CHOICES = (
        ("Standard", "Standard"),
        ("Graphical", "Graphical"),
        ("Minimal", "Minimal"),
    )
    LOADING_CHOICES = (("Standard", "Standard"),)
    SNACKBAR_CHOICES = (
        ("Standard", "Standard"),
        ("Minimal", "Minimal"),
    )
    NOT_FOUND_CHOICES = (
        ("Standard", "Standard"),
        ("Minimal", "Minimal"),
    )

    app_name = CustomCharField(
        max_length=50,
        verbose_name="App Name",
        help_text="App Name",
        unique=True,
        md_column_count=6,
        db_index=True,
    )
    business_name = CustomCharField(
        max_length=50,
        verbose_name="Business Name",
        help_text="Business Name",
        null=True,
        blank=True,
        md_column_count=6,
    )
    page_set = CustomForeignKeyField(
        PageSet,
        on_delete=models.CASCADE,
        verbose_name="App Page Set",
        md_column_count=6,
    )
    contact_set = CustomForeignKeyField(
        Contact,
        on_delete=models.CASCADE,
        verbose_name="App Contact Set",
        default=1,
        md_column_count=6,
    )
    jobs = CustomBooleanField(
        default=False,
        verbose_name="Jobs",
        help_text="Jobs",
    )
    users = CustomBooleanField(
        default=False,
        verbose_name="Users",
        help_text="Users",
    )
    services = CustomBooleanField(
        default=False,
        verbose_name="Services",
        help_text="Services",
    )
    nav_component = CustomCharField(
        max_length=10,
        choices=NAV_CHOICES,
        md_column_count=6,
        verbose_name="Navigation Component",
        help_text="Navigation Component Choice",
        null=True,
        blank=True,
    )
    footer_component = CustomCharField(
        max_length=10,
        choices=FOOTER_CHOICES,
        md_column_count=6,
        verbose_name="Footer Component",
        help_text="Footer Component Choice",
        null=True,
        blank=True,
    )
    fab_component = CustomCharField(
        max_length=10,
        choices=FAB_CHOICES,
        md_column_count=6,
        verbose_name="FAB Component",
        help_text="FAB Component Choice",
        null=True,
        blank=True,
    )
    error_component = CustomCharField(
        max_length=10,
        choices=ERROR_CHOICES,
        md_column_count=6,
        verbose_name="Error Component",
        help_text="Error Component Choice",
        null=True,
        blank=True,
    )
    loading_component = CustomCharField(
        max_length=10,
        choices=LOADING_CHOICES,
        md_column_count=6,
        verbose_name="Loading Component",
        help_text="Loading Component Choice",
        null=True,
        blank=True,
    )
    snackbar_component = CustomCharField(
        max_length=10,
        choices=SNACKBAR_CHOICES,
        md_column_count=6,
        verbose_name="Snackbar Component",
        help_text="Snackbar Component Choice",
        null=True,
        blank=True,
    )
    not_found_component = CustomCharField(
        max_length=10,
        choices=NOT_FOUND_CHOICES,
        md_column_count=6,
        verbose_name="404 Not Found Component",
        help_text="404 Not Found Component Choice",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.app_name

    class Meta:
        ordering = ["app_name"]
        verbose_name = "App"
        verbose_name_plural = "App"
