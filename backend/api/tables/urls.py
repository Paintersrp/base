from django.urls import path
from .views import *


urlpatterns = [
    path(
        "servicetablelabels/",
        ServiceTableLabelsListView.as_view(),
        name="servicetablelabels-list",
    ),
    path(
        "servicetablelabels/<int:pk>/",
        ServiceTableLabelsDetailView.as_view(),
        name="servicetablelabels-detail",
    ),
    path(
        "servicetablelabels/bulk/",
        ServiceTableLabelsBulkAPIView.as_view(),
        name="servicetablelabels-bulk-detail",
    ),
    path(
        "servicecomparerows/",
        ServiceCompareRowsListView.as_view(),
        name="servicecomparerows-list",
    ),
    path(
        "servicecomparerows/<int:pk>/",
        ServiceCompareRowsDetailView.as_view(),
        name="servicecomparerows-detail",
    ),
    path(
        "servicecomparerows/bulk/",
        ServiceCompareRowsBulkAPIView.as_view(),
        name="servicecomparerows-bulk-detail",
    ),
    path(
        "servicetable/",
        ServiceTableAPIView.as_view(),
        name="servicetable-list",
    ),
    path(
        "servicetable/<int:pk>/",
        ServiceTableDetailAPIView.as_view(),
        name="servicetable-detail",
    ),
    path(
        "servicetable/bulk/",
        ServiceTableBulkAPIView.as_view(),
        name="servicetable-bulk-detail",
    ),
]
