from django.urls import path
from .views import (
    ArticleListCreateView,
    ArticleRetrieveUpdateDestroyView,
    HighlightedArticlesView,
    RecentArticlesView,
    TagsView,
    TagsRetrieveUpdateDestroyView,
)


urlpatterns = [
    path("articles/", ArticleListCreateView.as_view(), name="articles-list"),
    path("tags/", TagsView.as_view(), name="tags-list"),
    path(
        "tags/<int:pk>/",
        TagsRetrieveUpdateDestroyView.as_view(),
        name="tags-detail-update-delete",
    ),
    path(
        "articles/<int:pk>/",
        ArticleRetrieveUpdateDestroyView.as_view(),
        name="article-detail-update-delete",
    ),
    path(
        "articles/recent/",
        RecentArticlesView.as_view(),
        name="recent-articles",
    ),
    path(
        "articles/highlighted/",
        HighlightedArticlesView.as_view(),
        name="highlighted-articles",
    ),
]
