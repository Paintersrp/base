SEO_HEADER_METADATA = {
    "autoform_label": "SEO Header",
    "long_description": "This model represents the headers used for SEO purposes on various pages of the website. It includes fields for the page name, title, description, keywords, image, and URL.",
    "short_description": "Headers for SEO",
    "pages_associated": {
        "Landing": "/",
        "About": "/about",
        "Services": "/services",
        "Contact": "/contact",
        "News": "/news",
    },
    "include_preview": False,
    "icon": "FindInPageIcon",
    "icon_class": None,
    "slug": "seo-headers",
    "tags": ["SEO", "Headers", "Website"],
    "related_components": ["SEOHeader", "PageContainer"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the headers used for SEO purposes on various pages of the website.",
        "fields": {
            "Image": "An image that represents the page and will be displayed in search engine results.",
            "Page": "The name of the page that the header belongs to.",
            "URL": "The URL of the page that the header belongs to.",
            "Title": "The title of the page that will be displayed in the browser tab and search engine results.",
            "Keywords": "A list of keywords that are relevant to the page, separated by commas.",
            "Description": "A brief description of the page that will be displayed in search engine results.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Header model reference": "/docs/model/header/",
            "General app documentation": "/docs/app/general/",
        },
    },
    "filter_options": [
        "page",
        "keywords",
    ],
    "allowed": False,
}


CONTENT_TEXT_BLOCK_METADATA = {
    "autoform_label": "Content Text Block",
    "long_description": "This model represents a content text block used to display a header or a description in the hero section of various pages.",
    "short_description": "Content Text Block",
    "pages_associated": {
        "Landing": "/",
        "About": "/about",
        "Services": "/services",
        "Contact": "/contact",
        "News": "/news",
    },
    "include_preview": True,
    "icon": "TitleIcon",
    "icon_class": None,
    "slug": "content-text-block",
    "tags": ["About", "Header", "Company"],
    "related_components": ["ServiceProcess"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a content text block used to display a header or a description in the hero section of various pages.",
        "fields": {
            "Slug (Identifier)": "The slug field is used to identify the content text block.",
            "Header": "The title field is used to display the top header of the hero section.",
            "Description": "The description field is used to display the description of the hero section.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "ContentTextBlock model reference": "/docs/model/contenttextblock/",
            "General app documentation": "/docs/app/general/",
        },
    },
    "filter_options": ["slug"],
    "allowed": True,
}
