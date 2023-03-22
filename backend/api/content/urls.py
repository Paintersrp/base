from django.urls import path
from .views import *

urlpatterns = [
    path(
        "head/",
        HeadAPIView.as_view(),
        name="head-list",
    ),
    path(
        "head/<int:pk>/",
        HeadDetailAPIView.as_view(),
        name="head-detail",
    ),
    path(
        "head/del/bulk/",
        HeadBulkAPIView.as_view(),
        name="head-bulk-detail",
    ),
    path(
        "text/",
        TextAPIView.as_view(),
        name="text-list",
    ),
    path(
        "text/<int:pk>/",
        TextDetailAPIView.as_view(),
        name="text-detail",
    ),
    path(
        "text/del/bulk/",
        TextBulkAPIView.as_view(),
        name="text-bulk-detail",
    ),
    path(
        "list/",
        ListAPIView.as_view(),
        name="list-list",
    ),
    path(
        "list/<int:pk>/",
        ListDetailAPIView.as_view(),
        name="list-detail",
    ),
    path(
        "list/del/bulk/",
        ListBulkAPIView.as_view(),
        name="list-bulk-detail",
    ),
    path("dictionary/", DictionaryAPIView.as_view(), name="dictionary-list"),
    path(
        "dictionary/<int:pk>/",
        DictionaryDetailAPIView.as_view(),
        name="dictionary-detail",
    ),
    path(
        "dictionary/del/bulk/",
        DictionaryBulkAPIView.as_view(),
        name="dictionary-bulk-detail",
    ),
    path(
        "section/",
        SectionAPIView.as_view(),
        name="section-list",
    ),
    path(
        "section/<int:pk>/",
        SectionDetailAPIView.as_view(),
        name="section-detail",
    ),
    path(
        "section/del/bulk/",
        SectionBulkAPIView.as_view(),
        name="section-bulk-detail",
    ),
    path(
        "page/",
        PageAPIView.as_view(),
        name="page-list",
    ),
    path(
        "page/<int:pk>/",
        PageDetailAPIView.as_view(),
        name="page-detail",
    ),
    path(
        "page/del/bulk/",
        PageBulkAPIView.as_view(),
        name="page-bulk-detail",
    ),
]