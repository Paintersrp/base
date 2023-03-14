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
    Category,
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
    CategorySerializer,
)
from authorization.authentication import JWTTokenAuthentication
from jobs.models import JobPosting
from api.views import get_model_metadata


class AboutFull(object):
    def __init__(
        self,
        about_block,
        mission_statement,
        company_history,
        core_values,
        team_members,
        contact_information,
        jobs,
    ):
        self.about_block = about_block
        self.mission_statement = mission_statement
        self.company_history = company_history
        self.core_values = core_values
        self.team_members = team_members
        self.contact_information = contact_information
        self.jobs = jobs


class AboutFullView(generics.GenericAPIView):
    serializer_class = AboutFullSerializer

    def get(self, request, *args, **kwargs):
        about_block = AboutBlock.objects.first()
        mission_statement = MissionStatement.objects.first()
        company_history = CompanyHistory.objects.first()
        core_values = Value.objects.all()
        team_members = TeamMember.objects.all()
        contact_information = ContactInformation.objects.first()
        jobs = JobPosting.objects.filter(filled=False)

        about_full = AboutFull(
            about_block,
            mission_statement,
            company_history,
            core_values,
            team_members,
            contact_information,
            jobs,
        )

        serializer = self.get_serializer(instance=about_full)

        return Response(serializer.data)


# Create your views here.
class AboutBlockAPIView(generics.ListCreateAPIView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer


class AboutBlockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutBlock.objects.all()
    serializer_class = AboutBlockSerializer


class MissionStatementAPIView(generics.ListCreateAPIView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer


class MissionStatementDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MissionStatement.objects.all()
    serializer_class = MissionStatementSerializer


class CompanyHistoryAPIView(generics.ListCreateAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer


class CompanyHistoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyHistory.objects.all()
    serializer_class = CompanyHistorySerializer


class ContactInformationAPIView(generics.ListCreateAPIView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer


class ContactInformationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer


class FAQListCreateView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.POST
        category = form_data.get("category")
        question = form_data.get("question")
        answer = form_data.get("answer")

        data = {
            "category": category,
            "question": question,
            "answer": answer,
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            faq = serializer.create(validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)


class FAQRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def update(self, request, *args, **kwargs):
        faq = self.get_object()
        form_data = request.POST
        category = form_data.get("category")
        question = form_data.get("question")
        answer = form_data.get("answer")

        data = {
            "category": category,
            "question": question,
            "answer": answer,
        }

        serializer = FAQSerializer(faq, data=data)

        if serializer.is_valid():
            serializer.update(faq, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)


class CategoryAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ValueViewSet(generics.ListCreateAPIView):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer


class ValueDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
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
        facebook = form_data.get("facebook")
        instagram = form_data.get("instagram")
        youtube = form_data.get("youtube")

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
            "facebook": facebook,
            "instagram": instagram,
            "youtube": youtube,
        }

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
        facebook = form_data.get("facebook")
        instagram = form_data.get("instagram")
        youtube = form_data.get("youtube")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            member.image.storage.delete(member.image.path)
            member.image = image
        else:
            image = member.image

        data = {
            "name": name,
            "role": role,
            "bio": bio,
            "image": image,
            "linkedIn": linkedIn,
            "github": github,
            "twitter": twitter,
            "facebook": facebook,
            "instagram": instagram,
            "youtube": youtube,
        }

        serializer = TeamMemberSerializer(member, data=data)

        if serializer.is_valid():
            serializer.update(member, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)
