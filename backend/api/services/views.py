from .models import Benefit

from .serializers import BenefitSerializer
from rest_framework import viewsets


class BenefitsViewSet(viewsets.ModelViewSet):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer
