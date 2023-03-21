from .models import *
from .serializers import *
from api.custom_views import *
from jobs.models import JobPosting


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


class AppInfoFull(object):
    def __init__(
        self,
        contact_information,
        socials,
        hours,
        members,
        jobs,
    ):
        self.contact_information = contact_information
        self.socials = socials
        self.hours = hours
        self.members = members
        self.jobs = jobs


class AppInfoFullView(generics.GenericAPIView):
    serializer_class = AppInfoFullSerializer

    def get(self, request, *args, **kwargs):
        contact_information = ContactInformation.objects.first()
        socials = Socials.objects.first()
        hours = Hours.objects.first()
        members = TeamMember.objects.all()
        jobs = JobPosting.objects.filter(filled=False)
        landing_full = AppInfoFull(contact_information, socials, hours, members, jobs)
        serializer = self.get_serializer(instance=landing_full)

        return Response(serializer.data)
