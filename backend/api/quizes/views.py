from .models import *
from .serializers import *
from api.custom_views import *
from collections import defaultdict
from typing import Dict
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .utils import analyze_questionnaire_results
from rest_framework.decorators import api_view


class QuestionnaireAPIView(BaseListView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    model_class = Questionnaire


class QuestionnaireDetailAPIView(BaseDetailView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    model_class = Questionnaire


class QuestionnaireBulkAPIView(BaseBulkView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    model_class = Questionnaire


class QuestionSetAPIView(BaseListView):
    queryset = QuestionSet.objects.all()
    serializer_class = QuestionSetSerializer
    model_class = QuestionSet
    foreign_key_fields = ["questionnaire"]


class QuestionSetDetailAPIView(BaseDetailView):
    queryset = QuestionSet.objects.all()
    serializer_class = QuestionSetSerializer
    model_class = QuestionSet


class QuestionSetBulkAPIView(BaseBulkView):
    queryset = QuestionSet.objects.all()
    serializer_class = QuestionSetSerializer
    model_class = QuestionSet


class QuestionAPIView(BaseListView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    model_class = Question
    foreign_key_fields = ["question_set"]


class QuestionDetailAPIView(BaseDetailView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    model_class = Question


class QuestionBulkAPIView(BaseBulkView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    model_class = Question


class AnswerChoiceAPIView(BaseListView):
    queryset = AnswerChoice.objects.all()
    serializer_class = AnswerChoiceSerializer
    model_class = AnswerChoice
    foreign_key_fields = ["question"]


class AnswerChoiceDetailAPIView(BaseDetailView):
    queryset = AnswerChoice.objects.all()
    serializer_class = AnswerChoiceSerializer
    model_class = AnswerChoice


class AnswerChoiceBulkAPIView(BaseBulkView):
    queryset = AnswerChoice.objects.all()
    serializer_class = AnswerChoiceSerializer
    model_class = AnswerChoice


class QuestionnaireResultsAPIView(BaseListView):
    queryset = QuestionnaireResults.objects.all()
    serializer_class = QuestionnaireResultsSerializer
    model_class = QuestionnaireResults


class QuestionnaireResultsDetailAPIView(BaseDetailView):
    queryset = QuestionnaireResults.objects.all()
    serializer_class = QuestionnaireResultsSerializer
    model_class = QuestionnaireResults


class QuestionnaireResultsBulkAPIView(BaseBulkView):
    queryset = QuestionnaireResults.objects.all()
    serializer_class = QuestionnaireResultsSerializer
    model_class = QuestionnaireResults


class QuestionnaireResultAnswerAPIView(BaseListView):
    queryset = QuestionnaireResultAnswer.objects.all()
    serializer_class = QuestionnaireResultAnswerSerializer
    model_class = QuestionnaireResultAnswer


class QuestionnaireResultAnswerDetailAPIView(BaseDetailView):
    queryset = QuestionnaireResultAnswer.objects.all()
    serializer_class = QuestionnaireResultAnswerSerializer
    model_class = QuestionnaireResultAnswer


class QuestionnaireResultAnswerBulkAPIView(BaseBulkView):
    queryset = QuestionnaireResultAnswer.objects.all()
    serializer_class = QuestionnaireResultAnswerSerializer
    model_class = QuestionnaireResultAnswer


@csrf_exempt
@api_view(["PATCH", "GET"])
def questionnaire_results(request, pk):
    questionnaire = get_object_or_404(Questionnaire, id=pk)
    results = QuestionnaireResults.objects.filter(questionnaire=questionnaire)
    analysis = analyze_questionnaire_results(results)
    print(len(results))

    response_data = {
        "questionnaire_id": pk,
        "questionnaire_name": questionnaire.title,
        "num_responses": len(results),
        "question_analysis": analysis,
    }
    return JsonResponse(response_data)
