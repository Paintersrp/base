from .models import *
from .serializers import *
from api.custom_views import *
from jobs.models import JobPosting
from api.utils import get_serialized_page_data


class ContactInformationAPIView(BaseListView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    model_class = ContactInformation


class ContactInformationDetailAPIView(BaseDetailView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    model_class = ContactInformation


class ContactInformationBulkAPIView(BaseBulkView):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    model_class = ContactInformation


class HoursAPIView(BaseListView):
    queryset = Hours.objects.all()
    serializer_class = HoursSerializer
    model_class = Hours


class HoursDetailAPIView(BaseDetailView):
    queryset = Hours.objects.all()
    serializer_class = HoursSerializer
    model_class = Hours


class HoursBulkAPIView(BaseBulkView):
    queryset = Hours.objects.all()
    serializer_class = HoursSerializer
    model_class = Hours


class SocialsAPIView(BaseListView):
    queryset = Socials.objects.all()
    serializer_class = SocialsSerializer
    model_class = Socials


class SocialsDetailAPIView(BaseDetailView):
    queryset = Socials.objects.all()
    serializer_class = SocialsSerializer
    model_class = Socials


class SocialsBulkAPIView(BaseBulkView):
    queryset = Socials.objects.all()
    serializer_class = SocialsSerializer
    model_class = Socials


class TeamMemberAPIView(BaseListView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    model_class = TeamMember


class TeamMemberDetailAPIView(BaseDetailView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    model_class = TeamMember


class TeamMemberBulkAPIView(BaseBulkView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    model_class = TeamMember


class AppInfoFullView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_dict = {
            "ContactInformation": {
                "app_label": "contact",
                "get_first": True,
            },
            "Socials": {
                "app_label": "contact",
                "get_first": True,
            },
            "Hours": {
                "app_label": "contact",
                "get_first": True,
            },
            "TeamMember": {
                "app_label": "contact",
            },
            "JobPosting": {
                "filter": {"filled": False},
                "app_label": "jobs",
            },
        }

        data = get_serialized_page_data(model_dict, request)
        return Response(data)
