from django.urls import path
from .views import *


urlpatterns = [
    path("benefits/", BenefitsAPIView.as_view(), name="benefits-list"),
    path("benefits/<int:pk>/", BenefitsDetailAPIView.as_view(), name="benefits-detail"),
    path(
        "benefits/bulk/",
        BenefitsBulkAPIView.as_view(),
        name="benefits-bulk-detail",
    ),
    path(
        "processtextitem/",
        ProcessTextItemAPIView.as_view(),
        name="processtextitem-list",
    ),
    path(
        "processtextitem/<int:pk>/",
        ProcessTextItemDetailAPIView.as_view(),
        name="processtextitem-detail",
    ),
    path(
        "processtextitem/bulk/",
        ProcessTextItemBulkAPIView.as_view(),
        name="processtextitem-bulk-detail",
    ),
    path(
        "processimageitem/",
        ProcessImageItemListView.as_view(),
        name="processimageitem-list",
    ),
    path(
        "processimageitem/<int:pk>/",
        ProcessImageItemDetailView.as_view(),
        name="processimageitem-detail",
    ),
    path(
        "processimageitem/bulk/",
        ProcessImageItemBulkAPIView.as_view(),
        name="processimageitem-bulk-detail",
    ),
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
    path("services/", ServiceFullView.as_view(), name="service-full"),
    path("servicetable/", ServiceCompareTableView.as_view(), name="table-full"),
]
