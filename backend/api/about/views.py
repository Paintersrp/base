from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from .models import AboutBlock, MissionStatement, CompanyHistory, Value
from .serializers import (
    AboutBlockSerializer,
    MissionStatementSerializer,
    CompanyHistorySerializer,
    AboutFullSerializer,
    ValueSerializer,
)
from authorization.authentication import JWTTokenAuthentication


class AboutFull(object):
    def __init__(self, about_block, mission_statement, company_history, core_values):
        self.about_block = about_block
        self.mission_statement = mission_statement
        self.company_history = company_history
        self.core_values = core_values


class AboutFullView(generics.GenericAPIView):
    serializer_class = AboutFullSerializer

    def get(self, request, *args, **kwargs):
        about_block = AboutBlock.objects.first()
        mission_statement = MissionStatement.objects.first()
        company_history = CompanyHistory.objects.first()
        core_values = Value.objects.all()

        about_full = AboutFull(
            about_block, mission_statement, company_history, core_values
        )
        serializer = self.get_serializer(instance=about_full)
        return Response(serializer.data)


# Create your views here.
class AboutBlockAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer

    def get_object(self):
        return AboutBlock.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):

        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def perform_update(self, request, *args, **kwargs):
        previous_instance = self.get_object()
        previous_image = previous_instance.image

        response = super().perform_update(request, *args, **kwargs)

        new_instance = self.get_object()
        new_image = new_instance.image
        if previous_image and previous_image != new_image:
            previous_image.delete(save=False)

        return response


class MissionStatementAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer

    def get_object(self):
        return MissionStatement.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        print(request.data)

        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class CompanyHistoryAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer

    def get_object(self):
        return CompanyHistory.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class ValueViewSet(viewsets.ModelViewSet):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
