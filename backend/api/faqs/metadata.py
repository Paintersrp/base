FAQ_SET_METADATA = {
    "autoform_label": "FAQ Set",
    "long_description": "This model represents a set of frequently asked questions.",
    "short_description": "Model for FAQ sets",
    "pages_associated": {
        "FAQ Sets": "/faq-sets",
        "FAQ Objects": "/faq-objects",
    },
    "include_preview": True,
    "icon": "FAQSetIcon",
    "icon_class": None,
    "slug": "faq-sets",
    "tags": ["FAQ", "Objects"],
    "related_components": [
        "FAQSetList",
        "FAQSetDetail",
        "FAQObjectList",
        "FAQObjectDetail",
    ],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a set of frequently asked questions.",
        "fields": {
            "Element Name": "The name of the FAQ set.",
            "Description": "A description of the FAQ set.",
            "Author": "The author of the FAQ set.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQSet model reference": "/docs/faqset/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


FAQ_QUESTION_CATEGORY_METADATA = {
    "autoform_label": "FAQ Question Category",
    "long_description": "This model represents a category for frequently asked questions.",
    "short_description": "Model for FAQ question categories",
    "pages_associated": {
        "FAQs": "/faqs",
        "Question Categories": "/question_categories",
    },
    "include_preview": True,
    "icon": "FAQCategoryIcon",
    "icon_class": None,
    "slug": "faq-question-categories",
    "tags": ["FAQs", "Question Categories"],
    "related_components": ["FAQQuestionCategoryList", "FAQQuestionCategoryDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a category for frequently asked questions.",
        "fields": {
            "Category Name": "The name of the category.",
            "Author": "The author of the category.",
            "Question Count": "The number of questions associated with the category.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestionCategory model reference": "/docs/faqquestioncategory/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


FAQ_QUESTION_METADATA = {
    "autoform_label": "FAQ Question",
    "long_description": "This model represents a question in a FAQ.",
    "short_description": "Model for FAQ questions",
    "pages_associated": {
        "FAQ": "/faq",
        "Questions": "/faq/questions",
    },
    "include_preview": True,
    "icon": "FAQQuestionIcon",
    "icon_class": None,
    "slug": "faq-questions",
    "tags": ["FAQ", "Questions"],
    "related_components": ["FAQQuestionList", "FAQQuestionDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a question in a FAQ.",
        "fields": {
            "Element Name": "The name of the question.",
            "Question": "The text of the question.",
            "Author": "The author of the question.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestion model reference": "/docs/faqquestion/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


FAQ_ANSWER_METADATA = {
    "autoform_label": "FAQ Answer",
    "long_description": "This model represents an answer to a frequently asked question.",
    "short_description": "Model for FAQ answers",
    "pages_associated": {
        "FAQ Questions": "/faq/questions",
        "FAQ Answers": "/faq/answers",
    },
    "include_preview": True,
    "icon": "FAQAnswerIcon",
    "icon_class": None,
    "slug": "faq-answers",
    "tags": ["FAQ", "Answers"],
    "related_components": ["FAQAnswerList", "FAQAnswerDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents an answer to a frequently asked question.",
        "fields": {
            "Answer": "The text of the answer.",
            "FAQ Question": "The question that this answer is associated with.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQAnswer model reference": "/docs/faqanswer/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}


FAQ_QUESTION_SET_METADATA = {
    "autoform_label": "FAQ Question Set",
    "long_description": "This model represents a set of FAQ questions and answers associated with an FAQ category and set.",
    "short_description": "Model for FAQ question sets",
    "pages_associated": {
        "FAQ Sets": "/faq/sets",
        "FAQ Categories": "/faq/categories",
        "FAQ Questions": "/faq/questions",
        "FAQ Answers": "/faq/answers",
    },
    "include_preview": True,
    "icon": "FAQQuestionSetIcon",
    "icon_class": None,
    "slug": "faq-question-sets",
    "tags": ["FAQ", "Questions", "Answers", "Categories", "Sets"],
    "related_components": ["FAQQuestionSetList", "FAQQuestionSetDetail"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a set of FAQ questions and answers associated with an FAQ category and set.",
        "fields": {
            "Name": "The name of the FAQ question set.",
            "FAQ Set": "The FAQ set that the question set belongs to.",
            "FAQ Category": "The FAQ category that the question set belongs to.",
            "FAQ Question": "The FAQ question associated with the question set.",
            "FAQ Answer": "The FAQ answer associated with the question set.",
            "Order": "The appearance order of the question set within its category.",
            "Author": "The author of the question set.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/ref/models/",
            "FAQQuestionSet model reference": "/docs/faqquestionset/",
        },
    },
    "allowed": True,
    "filter_options": ["name"],
}
