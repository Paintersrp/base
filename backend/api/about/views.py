from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from .models import (
    AboutBlock,
    MissionStatement,
    CompanyHistory,
    Value,
    TeamMember,
    ContactInformation,
    FAQ,
)
from django.http import JsonResponse
from .serializers import (
    AboutBlockSerializer,
    MissionStatementSerializer,
    CompanyHistorySerializer,
    AboutFullSerializer,
    ValueSerializer,
    TeamMemberSerializer,
    ContactInformationSerializer,
    FAQSerializer,
)
from authorization.authentication import JWTTokenAuthentication


class AboutFull(object):
    def __init__(
        self,
        about_block,
        mission_statement,
        company_history,
        core_values,
        team_members,
        contact_information,
    ):
        self.about_block = about_block
        self.mission_statement = mission_statement
        self.company_history = company_history
        self.core_values = core_values
        self.team_members = team_members
        self.contact_information = contact_information


class AboutFullView(generics.GenericAPIView):
    serializer_class = AboutFullSerializer

    def get(self, request, *args, **kwargs):
        about_block = AboutBlock.objects.first()
        mission_statement = MissionStatement.objects.first()
        company_history = CompanyHistory.objects.first()
        core_values = Value.objects.all()
        team_members = TeamMember.objects.all()
        contact_information = ContactInformation.objects.first()

        about_full = AboutFull(
            about_block,
            mission_statement,
            company_history,
            core_values,
            team_members,
            contact_information,
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


class ContactInformationAPIView(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView
):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer

    def get_object(self):
        return ContactInformation.objects.first()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class ValueViewSet(viewsets.ModelViewSet):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer


class TeamMemberListCreateView(generics.ListCreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.POST
        name = form_data.get("name")
        role = form_data.get("role")
        bio = form_data.get("bio")
        linkedIn = form_data.get("linkedIn")
        github = form_data.get("github")
        twitter = form_data.get("twitter")
        skills = form_data.get("skills")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
        else:
            image = None

        data = {
            "name": name,
            "role": role,
            "bio": bio,
            "image": image,
            "linkedIn": linkedIn,
            "github": github,
            "twitter": twitter,
            "skills": skills,
        }

        if isinstance(data.get("skills"), str):
            skills = data["skills"].split(",")
            data["skills"] = [{"name": skill.strip()} for skill in skills]

        serializer = TeamMemberSerializer(data=data)

        if serializer.is_valid():
            serializer.create(validated_data=data)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)


class TeamMemberRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def update(self, request, *args, **kwargs):
        member = self.get_object()
        form_data = request.POST
        name = form_data.get("name")
        role = form_data.get("role")
        bio = form_data.get("bio")
        linkedIn = form_data.get("linkedIn")
        github = form_data.get("github")
        twitter = form_data.get("twitter")
        skills = form_data.get("skills")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            member.image.storage.delete(member.image.path)
            member.image = image

        data = {
            "name": name,
            "role": role,
            "bio": bio,
            "image": image,
            "linkedIn": linkedIn,
            "github": github,
            "twitter": twitter,
            "skills": skills,
        }

        if isinstance(data.get("skills"), str):
            skills = data["skills"].split(",")
            data["skills"] = [{"name": skill.strip()} for skill in skills]

        serializer = TeamMemberSerializer(member, data=data)

        if serializer.is_valid():
            serializer.update(member, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)
