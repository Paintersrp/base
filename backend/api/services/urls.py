from django.urls import path
from .views import BenefitsViewSet


urlpatterns = [
    path("benefits/", BenefitsViewSet.as_view(), name="benefits-list"),
    path("benefits/<int:pk>/", BenefitsViewSet.as_view(), name="benefits-detail"),
]
