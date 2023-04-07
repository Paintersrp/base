from django.db import models
from api.customs import *
from api.utils import *
from authorization.models import User
from django.contrib.contenttypes.models import ContentType
from django.apps import apps
from contact.models import Contact
from django.urls import reverse
from general.models import Header


def allowed_content_types():
    return {"model__in": ComponentObj.allowed_models()}


@metadata(
    autoform_label="Component Category",
    long_description="This model represents a category for grouping page components.",
    short_description="A model for creating categories for page components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component-category",
    tags=["Page Components", "Categorization", "Grouping"],
    related_components=["Hero"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model is used to group page components together by category. For example, a 'Call to Action' category could contain several components related to encouraging users to take a specific action.",
        "fields": {
            "Category Name": "The name of the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["id", "name"],
    allowed=False,
)
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


@metadata(
    autoform_label="Component",
    long_description="This model represents a reusable component that can be added to a page in a Django web application. A component can be thought of as a building block for web pages that can be reused across different pages and applications.",
    short_description="A model for creating reusable components.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=True,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="component",
    tags=["Component", "Web Development", "Reusable"],
    related_components=[],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a reusable component that can be added to a page in a Django web application. A component can be thought of as a building block for web pages that can be reused across different pages and applications.",
        "fields": {
            "Component Name": "The name of the component.",
            "Component Category": "The category that the component belongs to.",
            "Page Appearance Order": "The order in which the component will appear on the page.",
            "Data Model Name": "The name of the data model that the component will use as a data source.",
            "Query Parameters": "Optional query parameters to filter the data source.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Page model reference": "/docs/model/page/",
            "Full App documentation": "/docs/app/app/",
        },
    },
    filter_options=["name", "category", "content", "id"],
    allowed=False,
)
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


@metadata(
    autoform_label="Page Content",
    long_description="This model represents a set of page content that can include various components.",
    short_description="A model for creating pages and page content.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="page",
    tags=["Landing", "Page", "Content"],
    related_components=["Hero", "Image", "Text"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a page, which can include various components such as a hero section, image, or text.",
        "fields": {
            "Page Name": "The name of the page.",
            "Page Display Name": "The display name of the page.",
            "Page Access Level": "The access level of the page.",
            "Components": "The components that make up the page.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "PageObj model reference": "/docs/model/pageobj/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    filter_options=["page_name"],
    allowed=False,
)
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


@metadata(
    autoform_label="Page Set",
    long_description="A model representing a set of pages on a website.",
    short_description="A set of pages",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="page-set",
    tags=["website", "pages"],
    related_components=[""],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents a set of pages on a website.",
        "fields": {
            "Set Name": "The name of the page set.",
            "Pages": "The pages in this set.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "PageSet model reference": "/docs/model/page-set/",
            "PageObj model reference": "/docs/model/page-obj/",
        },
    },
    filter_options=["id", "set_name"],
    allowed=False,
)
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


@metadata(
    autoform_label="App/Site",
    long_description="This model represents the configuration settings for the web application.",
    short_description="A model for configuring the web application.",
    pages_associated={
        "Landing": "/",
    },
    include_preview=False,
    icon="SubtitlesIcon",
    icon_class=None,
    slug="app-config",
    tags=["App Configuration", "Settings", "Web Application"],
    related_components=["All"],
    visibility=True,
    access_level="All",
    info_dump={
        "purpose": "This model represents the configuration settings for the web application, including navigation options, components, and page sets.",
        "fields": {
            "App Name": "The name of the web application.",
            "Business Name": "The name of the business associated with the web application.",
            "App Page Set": "The set of pages associated with the web application.",
            "App Contact Set": "The set of contact information associated with the web application.",
            "Jobs": "Whether the web application has a job board or not.",
            "Users": "Whether the web application has user accounts or not.",
            "Services": "Whether the web application offers services or not.",
            "Navigation Component": "The type of navigation component used in the web application.",
            "Footer Component": "The type of footer component used in the web application.",
            "FAB Component": "The type of FAB (floating action button) component used in the web application.",
            "Error Component": "The type of error component used in the web application.",
            "Loading Component": "The type of loading component used in the web application.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "PageSet model reference": "/docs/model/pageset/",
            "Contact model reference": "/docs/model/contact/",
        },
    },
    filter_options=["id", "app_name"],
    allowed=False,
)
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
