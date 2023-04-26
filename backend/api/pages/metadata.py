COMPONENT_CATEGORY_METADATA = {
    "autoform_label": "Component Category",
    "long_description": "This model represents a category for grouping page components.",
    "short_description": "A model for creating categories for page components.",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": False,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "component-category",
    "tags": ["Page Components", "Categorization", "Grouping"],
    "related_components": ["Hero"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": ["id", "name"],
    "allowed": False,
}


COMPONENT_METADATA = {
    "autoform_label": "Component",
    "long_description": "This model represents a reusable component that can be added to a page in a Django web application. A component can be thought of as a building block for web pages that can be reused across different pages and applications.",
    "short_description": "A model for creating reusable components.",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": True,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "component",
    "tags": ["Component", "Web Development", "Reusable"],
    "related_components": [],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": ["name", "category", "content", "id"],
    "allowed": False,
}


PAGE_METADATA = {
    "autoform_label": "Page Content",
    "long_description": "This model represents a set of page content that can include various components.",
    "short_description": "A model for creating pages and page content.",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": False,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "page",
    "tags": ["Landing", "Page", "Content"],
    "related_components": ["Hero", "Image", "Text"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": ["page_name"],
    "allowed": False,
}


PAGE_SET_METADATA = {
    "autoform_label": "Page Set",
    "long_description": "A model representing a set of pages on a website.",
    "short_description": "A set of pages",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": False,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "page-set",
    "tags": ["website", "pages"],
    "related_components": [""],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": ["id", "set_name"],
    "allowed": False,
}


APP_METADATA = {
    "autoform_label": "App/Site",
    "long_description": "This model represents the configuration settings for the web application.",
    "short_description": "A model for configuring the web application.",
    "pages_associated": {
        "Landing": "/",
    },
    "include_preview": False,
    "icon": "SubtitlesIcon",
    "icon_class": None,
    "slug": "app-config",
    "tags": ["App Configuration", "Settings", "Web Application"],
    "related_components": ["All"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
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
    "filter_options": ["id", "app_name"],
    "allowed": False,
}
