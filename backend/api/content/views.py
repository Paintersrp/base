from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
from jobs.models import JobPosting
from contact.models import ContactInformation
from rest_framework.response import Response
from api.custom_views import *


class HeadAPIView(BaseListView):
    queryset = Head.objects.all()
    serializer_class = HeadSerializer
    model_class = Head


class HeadDetailAPIView(BaseDetailView):
    queryset = Head.objects.all()
    serializer_class = HeadSerializer
    model_class = Head


class HeadBulkAPIView(BaseBulkView):
    queryset = Head.objects.all()
    serializer_class = HeadSerializer
    model_class = Head


class ListAPIView(BaseListView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    model_class = List


class ListDetailAPIView(BaseDetailView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    model_class = List


class ListBulkAPIView(BaseBulkView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    model_class = List


class TextAPIView(BaseListView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    model_class = Text


class TextDetailAPIView(BaseDetailView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    model_class = Text


class TextBulkAPIView(BaseBulkView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    model_class = Text


class DictionaryAPIView(BaseListView):
    queryset = Dictionary.objects.all()
    serializer_class = DictionarySerializer
    model_class = Dictionary


class DictionaryDetailAPIView(BaseDetailView):
    queryset = Dictionary.objects.all()
    serializer_class = DictionarySerializer
    model_class = Dictionary


class DictionaryBulkAPIView(BaseBulkView):
    queryset = Dictionary.objects.all()
    serializer_class = DictionarySerializer
    model_class = Dictionary


class SectionAPIView(BaseListView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    model_class = Section


class SectionDetailAPIView(BaseDetailView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    model_class = Section


class SectionBulkAPIView(BaseBulkView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    model_class = Section



