from django.urls import path
from .views import *


urlpatterns = [
    path(
        "taskcategory/",
        TaskCategoryAPIView.as_view(),
        name="taskcategory-list",
    ),
    path(
        "taskcategory/<int:pk>/",
        TaskCategoryDetailAPIView.as_view(),
        name="taskcategory-detail",
    ),
    path(
        "taskcategory/bulk/",
        TaskCategoryBulkAPIView.as_view(),
        name="taskcategory-bulk-detail",
    ),
    path(
        "task/",
        TaskAPIView.as_view(),
        name="task-list",
    ),
    path(
        "task/<int:pk>/",
        TaskDetailAPIView.as_view(),
        name="task-detail",
    ),
    path(
        "task/bulk/",
        TaskBulkAPIView.as_view(),
        name="task-bulk-detail",
    ),
    path(
        "tasklist/",
        TaskListAPIView.as_view(),
        name="tasklist-list",
    ),
    path(
        "tasklist/<int:pk>/",
        TaskListDetailAPIView.as_view(),
        name="tasklist-detail",
    ),
    path(
        "tasklist/bulk/",
        TaskListBulkAPIView.as_view(),
        name="tasklist-bulk-detail",
    ),
    path(
        "tasklist-builder/",
        TaskListBuilder.as_view(),
        name="tasklist-builder",
    ),
    path("tasklist-query/", TaskListByTitle.as_view(), name="tasklist-by-title"),
]
