from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from authorization.authentication import JWTTokenAuthentication
from api.signals import log_changes
from rest_framework.response import Response
from .models import *
from .serializers import *
from about.models import ContactInformation
from landing.models import ServiceTier
from django.shortcuts import get_object_or_404


class ServiceFull(object):
    def __init__(self, process_text, process_image, contact_information, service_tier):
        self.process_text = process_text
        self.process_image = process_image
        self.contact_information = contact_information
        self.service_tier = service_tier


class ServiceFullView(generics.GenericAPIView):
    serializer_class = ServiceViewSerializer

    def get(self, request, *args, **kwargs):
        process_text = ProcessTextItem.objects.all()
        process_image = ProcessImageItem.objects.all()
        contact_information = ContactInformation.objects.first()
        service_tier = ServiceTier.objects.all()

        service_full = ServiceFull(
            process_text, process_image, contact_information, service_tier
        )
        serializer = self.get_serializer(instance=service_full)

        return Response(serializer.data)


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


class ProcessTextItemListView(generics.ListCreateAPIView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer


class ProcessTextItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProcessTextItem.objects.all()
    serializer_class = ProcessTextItemSerializer


class ProcessImageItemListView(generics.ListCreateAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def create(self, request, *args, **kwargs):
        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        process_image = ProcessImageItem.objects.create(
            servicetier=servicetier,
            image=request.data.get("image"),
        )
        serializer = self.get_serializer(process_image)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProcessImageItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProcessImageItem.objects.all()
    serializer_class = ProcessImageItemSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        servicetier_name = request.data.get("servicetier")
        servicetier = get_object_or_404(ServiceTier, service_title=servicetier_name)

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            instance.image.storage.delete(instance.image.path)
            instance.image = image
        else:
            image = instance.image

        instance.servicetier = servicetier
        instance.image = image
        instance.save()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)
