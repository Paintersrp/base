from django.urls import path
from .views import (
    ArticleListCreateView,
    ArticleRetrieveUpdateDestroyView,
    HighlightedArticlesView,
    RecentArticlesView,
)


urlpatterns = [
    path("articles/", ArticleListCreateView.as_view(), name="article-list-create"),
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
