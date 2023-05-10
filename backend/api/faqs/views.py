from django.shortcuts import render
from api.custom_views import *
from .models import *
from .serializers import *
from datetime import datetime


class FAQAnswerAPIView(BaseListView):
    queryset = FAQAnswer.objects.all()
    serializer_class = FAQAnswerSerializer
    model_class = FAQAnswer


class FAQAnswerDetailAPIView(BaseDetailView):
    queryset = FAQAnswer.objects.all()
    serializer_class = FAQAnswerSerializer
    model_class = FAQAnswer


class FAQAnswerBulkAPIView(BaseBulkView):
    queryset = FAQAnswer.objects.all()
    serializer_class = FAQAnswerSerializer
    model_class = FAQAnswer


class FAQQuestionAPIView(BaseListView):
    queryset = FAQQuestion.objects.all()
    serializer_class = FAQQuestionSerializer
    model_class = FAQQuestion


class FAQQuestionDetailAPIView(BaseDetailView):
    queryset = FAQQuestion.objects.all()
    serializer_class = FAQQuestionSerializer
    model_class = FAQQuestion


class FAQQuestionBulkAPIView(BaseBulkView):
    queryset = FAQQuestion.objects.all()
    serializer_class = FAQQuestionSerializer
    model_class = FAQQuestion


class FAQQuestionSetAPIView(BaseListView):
    queryset = FAQQuestionSet.objects.all()
    serializer_class = FAQQuestionSetSerializer
    model_class = FAQQuestionSet


class FAQQuestionSetDetailAPIView(BaseDetailView):
    queryset = FAQQuestionSet.objects.all()
    serializer_class = FAQQuestionSetSerializer
    model_class = FAQQuestionSet


class FAQQuestionSetBulkAPIView(BaseBulkView):
    queryset = FAQQuestionSet.objects.all()
    serializer_class = FAQQuestionSetSerializer
    model_class = FAQQuestionSet


class FAQQuestionCategoryAPIView(BaseListView):
    queryset = FAQQuestionCategory.objects.all()
    serializer_class = FAQQuestionCategorySerializer
    model_class = FAQQuestionCategory


class FAQQuestionCategoryDetailAPIView(BaseDetailView):
    queryset = FAQQuestionCategory.objects.all()
    serializer_class = FAQQuestionCategorySerializer
    model_class = FAQQuestionCategory


class FAQQuestionCategoryBulkAPIView(BaseBulkView):
    queryset = FAQQuestionCategory.objects.all()
    serializer_class = FAQQuestionCategorySerializer
    model_class = FAQQuestionCategory


class FAQSetAPIView(BaseListView):
    queryset = FAQSet.objects.all()
    serializer_class = FAQSetSerializer
    model_class = FAQSet


class FAQSetDetailAPIView(BaseDetailView):
    queryset = FAQSet.objects.all()
    serializer_class = FAQSetSerializer
    model_class = FAQSet


class FAQSetBulkAPIView(BaseBulkView):
    queryset = FAQSet.objects.all()
    serializer_class = FAQSetSerializer
    model_class = FAQSet


class FAQBuilder(generics.CreateAPIView):
    serializer_class = FAQSetSerializer
    model_class = FAQSet

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        faq_items_data = data.pop("faqItems")
        author = User.objects.get(username=request.username)
        data["author"] = author
        faq = FAQSet.objects.create(**data)

        for item_data in faq_items_data:
            question_data = item_data.pop("question")
            answer_data = item_data.pop("answer")
            question_set_data = item_data.pop("question_set")
            category = question_set_data.pop("category")

            question = FAQQuestion.objects.create(author=author, **question_data)
            answer = FAQAnswer.objects.create(
                author=author, faq_question=question, **answer_data
            )
            category = FAQQuestionCategory.objects.create(author=author, name=category)
            question_set = FAQQuestionSet.objects.create(
                author=author,
                faqset=faq,
                faq_category=category,
                faq_question=question,
                faq_answer=answer,
                **question_set_data
            )

        faq.save()
        serializer = self.get_serializer(faq)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
