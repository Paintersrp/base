BENEFITS_METADATA = {
    "autoform_label": "Benefit",
    "long_description": "This model represents the benefits offered by your company to your customers. Each benefit has a header, description, icon, button text, and a link to a page.",
    "short_description": "Model for benefits offered by our company",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "ViewListIcon",
    "icon_class": None,
    "slug": "service-benefits",
    "tags": ["Benefits", "Services", "Company"],
    "related_components": ["Benefits", "Benefit"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the benefits offered by your company to your customers for a particular service tier.",
        "fields": {
            "Icon": "The name of the icon used to represent the benefit",
            "Header Text": "The header text of the benefit",
            "Page Link": "The page link to the content represented by the benefit",
            "Content Text": "A brief description of the benefit",
            "Button Text": "The text to display on the button that links to the benefit page",
        },
        "model_links": {
            "Creating a Benefits object": "https://docs.example.com/create-benefits-object",
            "Updating a Benefits object": "https://docs.example.com/update-benefits-object",
            "Deleting a Benefits object": "https://docs.example.com/delete-benefits-object",
        },
    },
    "filter_options": [
        "title",
        "id",
    ],
    "allowed": True,
}


PROCESS_IMAGE_ITEM_METADATA = {
    "autoform_label": "Process Image Item",
    "long_description": "This model represents an image used in the process of providing our services. Each image is associated with a service tier.",
    "short_description": "A model for process images",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "ImageIcon",
    "icon_class": None,
    "slug": "process-image-item",
    "tags": ["Service", "Image"],
    "related_components": ["ProcessImage"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents an image used in the process of providing our services, and is associated with a specific service tier.",
        "fields": {
            "Image": "The image file.",
            "Service Tier": "The service tier that this image is associated with.",
        },
        "model_links": {
            "Creating a ProcessImageItem object": "https://docs.example.com/create-processimageitem-object",
            "Updating a ProcessImageItem object": "https://docs.example.com/update-processimageitem-object",
            "Deleting a ProcessImageItem object": "https://docs.example.com/delete-processimageitem-object",
        },
    },
    "filter_options": [
        "servicetier",
        "id",
    ],
    "allowed": False,
}


PROCESS_TEXT_ITEM_METADATA = {
    "autoform_label": "Process Text Item",
    "long_description": "This model represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
    "short_description": "A text item in a process or workflow.",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": True,
    "icon": "Description",
    "icon_class": None,
    "slug": "process-text-item",
    "tags": ["Service", "Text"],
    "related_components": ["ProcessText"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "Represents a text item in a process or workflow. It contains a title, description, and an optional icon.",
        "fields": {
            "Title": "The title of the text item. Limited to 100 characters.",
            "Description": "The description of the text item. Limited to 500 characters.",
            "Icon": "The icon associated with the text item. Limited to 40 characters.",
        },
        "model_links": {
            "Creating a ProcessTextItem object": "https://docs.example.com/create-processtextitem-object",
            "Updating a ProcessTextItem object": "https://docs.example.com/update-processtextitem-object",
            "Deleting a ProcessTextItem object": "https://docs.example.com/delete-processtextitem-object",
        },
    },
    "filter_options": [
        "title",
        "id",
    ],
    "allowed": True,
}


QUIZ_METADATA = {
    "autoform_label": "Quiz",
    "long_description": "A quiz to help users determine which service tier is best for them.",
    "short_description": "quiz",
    "pages_associated": {
        "Landing": "/",
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "Description",
    "icon_class": None,
    "slug": "service-quiz",
    "tags": ["quiz", "service"],
    "related_components": ["Questionnaire"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a quiz designed to help users determine which service tier is best for them.",
        "fields": {
            "name": "The name of the quiz",
            "service_tiers": "The service tiers that are available for the user to choose from",
            "benefits": "The benefits associated with each service tier",
            "title_block": "The title block to display at the top of the quiz",
            "tiers_table": "The service tier comparison table to display in the quiz",
            "competitors_table": "The competitor comparison table to display in the quiz",
            "questionnaire": "The questionnaire associated with the quiz",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Quiz model reference": "/docs/model/quiz/",
            "Questionnaire model reference": "/docs/model/questionnaire/",
            "Landing app documentation": "/docs/app/landing/",
        },
    },
    "filter_options": ["name"],
    "allowed": False,
}
