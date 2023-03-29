from django.urls import path
from .views import *


urlpatterns = [
    path(
        "reactcomponent/",
        ReactComponentAPIView.as_view(),
        name="reactcomponent-list",
    ),
    path(
        "reactcomponent/<int:pk>/",
        ReactComponentDetailAPIView.as_view(),
        name="reactcomponent-detail",
    ),
    path(
        "reactcomponent/bulk/",
        ReactComponentBulkAPIView.as_view(),
        name="reactcomponent-bulk-detail",
    ),
    path("reactpage/", ReactPageAPIView.as_view(), name="reactpage-list"),
    path(
        "reactpage/<int:pk>/", ReactPageDetailAPIView.as_view(), name="reactpage-detail"
    ),
    path(
        "reactpage/bulk/",
        ReactPageBulkAPIView.as_view(),
        name="reactpage-bulk-detail",
    ),
]
