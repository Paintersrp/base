from api.utils import *

ABOUT_BLOCK_METADATA = {
    "autoform_label": "About Header",
    "long_description": "This model represents the header block of the About page.",
    "short_description": "Header block for the About page.",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": True,
    "icon": "Description",
    "icon_class": None,
    "slug": "about-heading",
    "tags": ["About", "Header", "Company"],
    "related_components": ["AboutHeading"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the header block of the About page.",
        "fields": {
            "Image": "The image used in the header block.",
            "Company Name": "Name of the Company.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "AboutBlock model reference": "/docs/model/aboutblock/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": True,
    "category": "About",
}


MISSION_STATEMENT_METADATA = {
    "autoform_label": "Mission Statement",
    "long_description": "This model represents the mission statement for a company or organization.",
    "short_description": "A company's mission statement.",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": True,
    "icon": "BusinessIcon",
    "icon_class": None,
    "slug": "mission-statement",
    "tags": ["About", "Mission Statement", "Company"],
    "related_components": ["ContentSection"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the mission statement for a company or organization.",
        "fields": {
            "Section Title": "The title of the mission statement.",
            "Mission Statement Body": "The content of the mission statement.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "MissionStatement model reference": "/docs/model/missionstatement/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "name",
        "title",
        "id",
    ],
    "allowed": True,
}


COMPANY_HISTORY_METADATA = {
    "autoform_label": "Company History",
    "long_description": "This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
    "short_description": "Model for company history",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": True,
    "icon": "WorkHistoryIcon",
    "icon_class": None,
    "slug": "company-history",
    "tags": ["About", "History", "Company"],
    "related_components": ["ContentSection"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the history of the company, including major milestones and events. It can be used to showcase the company's achievements and growth over time.",
        "fields": {
            "Section Title": "The title of the company history entry.",
            "Company History Body": "The main text content of the company history entry.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "CompanyHistory model reference": "/docs/model/companyhistory/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "name",
        "title",
        "id",
    ],
    "allowed": True,
}


VALUE_METADATA = {
    "autoform_label": "Company Value",
    "long_description": "This model represents the core values of our company.",
    "short_description": "Core company values.",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": True,
    "icon": "JoinInnerIcon",
    "icon_class": None,
    "slug": "company-values",
    "tags": ["Values", "Culture", "Company"],
    "related_components": ["ContentSection"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to store the core values of our company, which guide our decisions, actions, and behavior as a team.",
        "fields": {
            "Title": "The title of the value, such as 'Integrity' or 'Customer Focus.'",
            "Icon": "The name of the icon to use for this value, such as 'mdi-heart' or 'mdi-account-group.'",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Value model reference": "/docs/model/value/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "title",
        "id",
    ],
    "filter_choices": lambda model: get_filter_choices(
        model,
        [
            "title",
            "id",
        ],
    ),
    "allowed": True,
}


CATEGORY_METADATA = {
    "autoform_label": "FAQ Category",
    "long_description": "This model represents a category for frequently asked questions on our website.",
    "short_description": "FAQ Category",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": False,
    "icon": "CategoryIcon",
    "icon_class": None,
    "slug": "faq-category",
    "tags": ["FAQ", "Category"],
    "related_components": ["FAQAccordion"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a category for frequently asked questions on our website.",
        "fields": {
            "Category Name": "The name of the FAQ category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Category model reference": "/docs/model/category/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": False,
}


FAQ_METADATA = {
    "autoform_label": "FAQ",
    "long_description": "This model represents frequently asked questions and answers related to our company and services.",
    "short_description": "FAQ Model",
    "pages_associated": {
        "About": "/about",
    },
    "include_preview": True,
    "icon": "QuestionAnswerIcon",
    "icon_class": None,
    "slug": "faq",
    "tags": ["About", "FAQ", "Question", "Answer", "Support"],
    "related_components": ["FAQAccordion"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to manage frequently asked questions and their corresponding answers. It is intended to be used on pages where customers may have common questions about our products or services.",
        "fields": {
            "Category": "This field represents the category that the question and answer belong to. It is a foreign key to the Category model.",
            "Question": "This field represents the question being asked. It has a maximum length of 500 characters.",
            "Answer": "This field represents the answer to the question being asked. It has a maximum length of 500 characters.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "FAQ model reference": "/docs/model/faq/",
            "About app documentation": "/docs/app/about/",
        },
    },
    "filter_options": [
        "name",
        "id",
    ],
    "allowed": False,
}
