QUESTIONNAIRE_METADATA = {
    "autoform_label": "Questionnaire",
    "long_description": "This model represents a questionnaire that users can fill out to provide feedback.",
    "short_description": "A model for creating and managing questionnaires.",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "QuestionAnswerIcon",
    "icon_class": None,
    "slug": "questionnaire",
    "tags": ["Questionnaire", "Feedback", "Survey"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "The Questionnaire model is used to create and manage surveys that can be filled out by users to provide feedback.",
        "fields": {
            "Questionnaire Name": "The name of the questionnaire, which is displayed as the top header in the hero section.",
            "Slug (Identifier)": "A unique identifier for the questionnaire, used in the URL.",
            "Description": "A brief description of the questionnaire.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Questionnaire model reference": "/docs/model/questionnaire/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": [
        "slug",
        "id",
    ],
    "allowed": True,
}


QUESTION_SET_METADATA = {
    "autoform_label": "Question Set",
    "long_description": "A set of questions to be answered in a questionnaire",
    "short_description": "Question Set",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "QuizIcon",
    "icon_class": None,
    "slug": "question-set",
    "tags": ["Questionnaire", "Questions", "Survey"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents a set of questions to be answered in a questionnaire.",
        "fields": {
            "Title": "The title of the question set.",
            "Order": "The ordering of the question set within the questionnaire.",
            "Description": "A description of the question set.",
            "Questionnaire": "Questionnaire to which the question sets belong.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionSet model reference": "/docs/model/questionset/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": ["id", "title", "questionnaire"],
    "allowed": False,
}


QUESTION_METADATA = {
    "autoform_label": "Question",
    "long_description": "This model represents a question that can be displayed in a Question Set within a Questionnaire on the website.",
    "short_description": "An individual question",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "QuestionMarkIcon",
    "icon_class": None,
    "slug": "question",
    "tags": ["Quiz", "Questionnaire", "Question"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model is used to represent a question that can be displayed in a Questionnaire/Question Set on the website. Each question has a text, a slug, and an order field that determines its position in the header. The question set to which each question belongs is specified using a foreign key field.",
        "fields": {
            "Text": "The text of the question that is displayed in the header.",
            "Question Set": "A foreign key field that links each question to the question set to which it belongs.",
            "Order": "An integer field that determines the order in which the questions are displayed in the header.",
            "Slug (Identifier)": "A slug field that is used to generate a URL for the question.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "Question model reference": "/docs/model/question/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": ["id", "slug", "question_set"],
    "allowed": False,
}


ANSWER_CHOICE_METADATA = {
    "autoform_label": "Answer Choice",
    "long_description": "This model represents the answer choices for Questionnaire questions.",
    "short_description": "Answer Choices Model",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "QuickreplyIcon",
    "icon_class": None,
    "slug": "answer-choices",
    "tags": ["Questionnaire", "Multiple-Choice", "Answers"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the possible answer choices for a multiple-choice question.",
        "fields": {
            "Text": "The text of the answer choice.",
            "Value": "The numerical value associated with the answer choice.",
            "Order": "The order in which the answer choices should be displayed.",
            "Question": "The question that this answer choice belongs to.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "AnswerChoice model reference": "/docs/model/answerchoice/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": ["id", "text", "question"],
    "allowed": False,
}


QUESTIONNAIRE_RESULT_METADATA = {
    "autoform_label": "Questionnaire Result",
    "long_description": "Stores the results of a questionnaire filled out by a user.",
    "short_description": "Questionnaire Results Model",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "BarChartIcon",
    "icon_class": None,
    "slug": "questionnaire-results",
    "tags": ["Questionnaire", "Results", "User Data"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": True,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the results of a user-filled questionnaire.",
        "fields": {
            "Questionnaire": "A foreign key reference to the Questionnaire model.",
            "Contact Name": "The name of the person who filled out the questionnaire.",
            "Contact Email": "The email address of the person who filled out the questionnaire.",
            "Contact Phone": "The phone number of the person who filled out the questionnaire (optional).",
            "Contact State": "The state of the person who filled out the questionnaire (optional).",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionnaireResults model reference": "/docs/model/questionnaireresults/",
            "Quizes app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": [
        "id",
        "contact_state",
        "questionnaire",
    ],
    "allowed": False,
}


QUESTIONNAIRE_RESULT_ANSWER_METADATA = {
    "autoform_label": "Questionnaire Result Answer Choice",
    "long_description": "This model stores the answer choices selected by a user for a specific question in a questionnaire result.",
    "short_description": "Stores answer choices for a question in a questionnaire result.",
    "pages_associated": {
        "Services": "/services",
    },
    "include_preview": False,
    "icon": "SummarizeIcon",
    "icon_class": None,
    "slug": "questionnaire-result-answer-choice",
    "tags": ["Questionnaire", "Answer", "Choice"],
    "related_components": ["Questionnaire", "Quiz"],
    "visibility": False,
    "access_level": "All",
    "info_dump": {
        "purpose": "This model represents the answer choice selected by a user for a specific question in a questionnaire result. It is part of the overall questionnaire result, which can contain multiple answers for multiple questions.",
        "fields": {
            "Questionnaire Result": "A foreign key reference to the overall questionnaire result that this answer choice belongs to.",
            "Question": "A foreign key reference to the question that this answer choice is answering.",
            "Question Text": "The text of the question that this answer choice is answering.",
            "Answer Choice": "A foreign key reference to the specific answer choice that the user selected.",
            "Answer Choice Text": "The text of the answer choice that the user selected.",
        },
        "model_links": {
            "Django documentation": "https://docs.djangoproject.com/en/3.2/topics/db/models/",
            "QuestionnaireResultAnswer model reference": "/docs/model/questionnaireresultanswer/",
            "General app documentation": "/docs/app/quizes/",
        },
    },
    "filter_options": [
        "id",
        "question",
        "answer_choice",
        "questionnaire_result",
    ],
    "allowed": False,
}
