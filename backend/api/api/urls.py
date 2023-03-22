from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from authorization.views import *

urlpatterns = (
    [
        path(
            "admin/<int:content_type_id>/<int:object_id>/",
            views.custom_admin_url_return,
            name="custom_admin_url_return",
        ),
        path(
            "api/get_metadata/<str:model_name>/",
            views.ModelMetadataAPIView.as_view(),
            name="get_metadata",
        ),
        path(
            "api/get_models/",
            views.ModelEndpointAPIView.as_view(),
            name="get_models",
        ),
        path(
            "api/get_models/<str:model_name>/",
            views.SingleModelAPIView.as_view(),
            name="get_model_metadata",
        ),
        path(
            "api/get_app/<str:app_name>/",
            views.SingleAppEndpointAPIView.as_view(),
            name="get_model_metadata",
        ),
        path("api/user/", views.UserListView.as_view(), name="user-list"),
        path("admin/", admin.site.urls),
        path(
            "api/recent_admin_actions/",
            views.RecentAdminActionsView.as_view(),
            name="recent_admin_actions",
        ),
        path("api/subscribe/", views.subscribe_to_newsletter, name="subscribe-list"),
        path(
            "api/themesettings/",
            ThemeSettingsAPIView.as_view(),
            name="themesettings-list",
        ),
        path(
            "api/themesettings/<int:pk>/",
            ThemeSettingsDetailGenericView.as_view(),
            name="themesettings-detail",
        ),
        path(
            "api/themesettings/bulk/",
            ThemeSettingsBulkAPIView.as_view(),
            name="themesettings-bulk-detail",
        ),
        path(
            "api/tokenblacklist/",
            TokenBlacklistAPIView.as_view(),
            name="tokenblacklist-list",
        ),
        path(
            "api/tokenblacklist/<int:pk>/",
            TokenBlacklistDetailView.as_view(),
            name="tokenblacklist-detail",
        ),
        path(
            "api/tokenblacklist/bulk/",
            TokenBlacklistBulkAPIView.as_view(),
            name="tokenblacklist-bulk-detail",
        ),
        path("api/auth/", include("authorization.urls")),
        path("api/", include("content.urls")),
        path("api/", include("contact.urls")),
        path("api/", include("tables.urls")),
        path("api/", include("quizes.urls")),
        path("api/", include("articles.urls")),
        path("api/", include("landing.urls")),
        path("api/", include("about.urls")),
        path("api/", include("services.urls")),
        path("api/", include("support.urls")),
        path("api/", include("jobs.urls")),
        path("api/", include("general.urls")),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)
