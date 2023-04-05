from .models import *
from .serializers import *
from api.custom_views import *
from jobs.models import JobPosting
from api.utils import get_serialized_page_data
from django.shortcuts import get_object_or_404


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


class ContactBulkAPIView(BaseBulkView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    model_class = Contact


class ContactAPIView(BaseListView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    model_class = Contact

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        print(data)

        contact_info_id = data.get("contact_info")
        socials_id = data.get("socials")
        hours_id = data.get("hours")
        print(contact_info_id)

        contact_info = get_object_or_404(ContactInformation, pk=contact_info_id)
        socials = get_object_or_404(Socials, pk=socials_id)
        hours = get_object_or_404(Hours, pk=hours_id)

        data["contact_info"] = contact_info
        data["socials"] = socials
        data["hours"] = hours

        serializer = self.get_serializer(data=data)

        serializer.is_valid()
        print(serializer.errors)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ContactDetailView(BaseDetailView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    model_class = Contact


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
            "PageObj": {
                "app_label": "pages",
            },
        }

        data = get_serialized_page_data(model_dict, request)
        return Response(data)
