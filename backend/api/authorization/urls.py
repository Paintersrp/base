from django.urls import path, include
from . import views

urlpatterns = [
    path("verify/", views.verify_jwt, name="verify-jwt"),
    path("login/", views.login_view, name="login-list"),
    path("salt/", views.get_salt_view, name="salt-list"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),
    path("update-profile/", views.update_profile, name="update-profile"),
    path("settings/", views.ThemeSettingsView.as_view(), name="settings"),
]
