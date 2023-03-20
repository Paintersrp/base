from .models import *
from .serializers import *
from api.custom_views import *


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


class QuestionnaireResultAnswerAPIView(BaseListView):
    queryset = QuestionnaireResultAnswer.objects.all()
    serializer_class = QuestionnaireResultAnswerSerializer
    model_class = QuestionnaireResultAnswer
