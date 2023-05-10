from rest_framework import serializers
from .models import *


class FAQQuestionSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = FAQQuestion
        fields = "__all__"


class FAQAnswerSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = FAQAnswer
        fields = "__all__"


class FAQQuestionCategorySerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = FAQQuestionCategory
        fields = "__all__"


class FAQQuestionSetFullSerializer(serializers.ModelSerializer):
    question_data = FAQQuestionSerializer(source="faq_question")
    answer_data = FAQAnswerSerializer(source="faq_answer")
    category_data = FAQAnswerSerializer(source="faq_category")
    FIELD_KEYS = ["name"]

    class Meta:
        model = FAQQuestionSet
        fields = "__all__"


class FAQQuestionSetSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]

    class Meta:
        model = FAQQuestionSet
        fields = "__all__"


class FAQSetSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["name"]
    question_sets = FAQQuestionSetFullSerializer(many=True, read_only=True)

    class Meta:
        model = FAQSet
        fields = [
            "id",
            "name",
            "question_sets",
            "author",
            "description",
            "type",
            "created_at",
            "updated_at",
        ]


FAQQuestion.serializer_class = FAQQuestionSerializer
FAQAnswer.serializer_class = FAQAnswerSerializer
FAQQuestionCategory.serializer_class = FAQQuestionCategorySerializer
FAQQuestionSet.serializer_class = FAQQuestionSetSerializer
FAQSet.serializer_class = FAQSetSerializer
