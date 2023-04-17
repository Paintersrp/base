from django.urls import path
from .views import *


urlpatterns = [
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
        "tasklist",
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
        "tasksection/",
        TaskSectionAPIView.as_view(),
        name="tasksection-list",
    ),
    path(
        "tasksection/<int:pk>/",
        TaskSectionDetailAPIView.as_view(),
        name="tasksection-detail",
    ),
    path(
        "tasksection/bulk/",
        TaskSectionBulkAPIView.as_view(),
        name="tasksection-bulk-detail",
    ),
    path(
        "tasklist-builder/",
        TaskListBuilder.as_view(),
        name="tasklist-builder",
    ),
    path("tasklist-query/", TaskListByTitle.as_view(), name="tasklist2-by-title"),
]
