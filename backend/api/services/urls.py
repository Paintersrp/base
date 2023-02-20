from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BenefitsViewSet


router = DefaultRouter()
router.register(r"benefits", BenefitsViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
