from .models import Benefits
from .serializers import BenefitsSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from authorization.authentication import JWTTokenAuthentication
from api.signals import log_changes


class BenefitsViewSet(
    generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView
):
    queryset = Benefits.objects.all()
    serializer_class = BenefitsSerializer
    authentication_classes = [TokenAuthentication, JWTTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        benefits_obj = serializer.instance
        log_changes(sender=Benefits, instance=benefits_obj, user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        benefits_obj = serializer.instance
        log_changes(sender=Benefits, instance=benefits_obj, user=self.request.user)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        context = self.get_serializer_context()
        context["user"] = self.request.user
        kwargs["context"] = context
        return serializer_class(*args, **kwargs)
