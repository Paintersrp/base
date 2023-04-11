from django.urls import path
from .views import *


urlpatterns = [
    path(
        "faqanswer/",
        FAQAnswerAPIView.as_view(),
        name="faqanswer-list",
    ),
    path(
        "faqanswer/<int:pk>/",
        FAQAnswerDetailAPIView.as_view(),
        name="faqanswer-detail",
    ),
    path(
        "faqanswer/bulk/",
        FAQAnswerBulkAPIView.as_view(),
        name="faqanswer-bulk-detail",
    ),
    path(
        "faqquestion/",
        FAQQuestionAPIView.as_view(),
        name="faqquestion-list",
    ),
    path(
        "faqquestion/<int:pk>/",
        FAQQuestionDetailAPIView.as_view(),
        name="faqquestion-detail",
    ),
    path(
        "faqquestion/bulk/",
        FAQQuestionBulkAPIView.as_view(),
        name="faqquestion-bulk-detail",
    ),
    path(
        "faqquestioncategory/",
        FAQQuestionCategoryAPIView.as_view(),
        name="faqquestioncategory-list",
    ),
    path(
        "faqquestioncategory/<int:pk>/",
        FAQQuestionCategoryDetailAPIView.as_view(),
        name="faqquestioncategory-detail",
    ),
    path(
        "faqquestioncategory/bulk/",
        FAQQuestionCategoryBulkAPIView.as_view(),
        name="faqquestioncategory-bulk-detail",
    ),
    path(
        "faqquestionset/",
        FAQQuestionSetAPIView.as_view(),
        name="faqquestionset-list",
    ),
    path(
        "faqquestionset/<int:pk>/",
        FAQQuestionSetDetailAPIView.as_view(),
        name="faqquestionset-detail",
    ),
    path(
        "faqquestionset/bulk/",
        FAQQuestionSetBulkAPIView.as_view(),
        name="faqquestionset-bulk-detail",
    ),
    path(
        "faqset/",
        FAQSetAPIView.as_view(),
        name="faqset-list",
    ),
    path(
        "faqset/<int:pk>/",
        FAQSetDetailAPIView.as_view(),
        name="faqset-detail",
    ),
    path(
        "faqset/bulk/",
        FAQSetBulkAPIView.as_view(),
        name="faqset-bulk-detail",
    ),
    # path(
    #     "faq-builder/",
    #     FAQBuilder.as_view(),
    #     name="faq-builder",
    # ),
]
