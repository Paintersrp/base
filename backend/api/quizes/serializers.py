from rest_framework import serializers
from .models import *


class AnswerChoiceSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    FIELD_KEYS = ["text", "value", "question", "order"]

    class Meta:
        model = AnswerChoice
        fields = ["id", "text", "value", "order", "question"]


class QuestionSerializer(serializers.ModelSerializer):
    answer_choices = AnswerChoiceSerializer(many=True, read_only=True)
    question_set = serializers.PrimaryKeyRelatedField(
        queryset=QuestionSet.objects.all()
    )
    FIELD_KEYS = ["question_set", "text", "order"]

    class Meta:
        model = Question
        fields = ["id", "text", "answer_choices", "question_set", "order"]


class QuestionSetSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    questionnaire = serializers.PrimaryKeyRelatedField(
        queryset=Questionnaire.objects.all()
    )
    FIELD_KEYS = ["title", "description", "questionnaire"]

    class Meta:
        model = QuestionSet
        fields = ["id", "title", "description", "questions", "questionnaire", "order"]


class QuestionnaireSerializer(serializers.ModelSerializer):
    question_sets = QuestionSetSerializer(many=True, read_only=True)
    FIELD_KEYS = ["title", "description", "slug"]

    class Meta:
        model = Questionnaire
        fields = ["id", "title", "slug", "description", "question_sets"]


class QuestionnaireResultsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["questionnaire", "results"]

    class Meta:
        model = QuestionnaireResults
        fields = [
            "id",
            "questionnaire",
            "results",
        ]

    def create(self, validated_data):
        instance = super().create(validated_data)
        results_data = validated_data.pop("results")
        results = []

        for question_id, answer in results_data.items():
            answer_choice = AnswerChoice.objects.get(id=answer)
            question = Question.objects.get(id=question_id)

            results.append(
                QuestionnaireResultAnswer(
                    questionnaire_result=instance,
                    question=question,
                    answer_choice=answer_choice,
                )
            )
        QuestionnaireResultAnswer.objects.bulk_create(results)

        return instance


class QuestionnaireResultAnswerSerializer(serializers.ModelSerializer):
    FIELD_KEYS = ["question", "answer_choice", "text"]

    class Meta:
        model = QuestionnaireResultAnswer
        fields = ["id", "question", "answer_choice", "text"]


QuestionnaireResultAnswer.serializer_class = QuestionnaireResultAnswerSerializer
QuestionnaireResults.serializer_class = QuestionnaireResultsSerializer
Questionnaire.serializer_class = QuestionnaireSerializer
QuestionSet.serializer_class = QuestionSetSerializer
Question.serializer_class = QuestionSerializer
AnswerChoice.serializer_class = AnswerChoiceSerializer
