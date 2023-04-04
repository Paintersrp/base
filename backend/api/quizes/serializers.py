from rest_framework import serializers
from .models import *


class AnswerChoiceSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    FIELD_KEYS = [
        "question",
        "order",
        "text",
        "value",
    ]

    class Meta:
        model = AnswerChoice
        fields = [
            "id",
            "text",
            "value",
            "order",
            "question",
        ]


class QuestionSerializer(serializers.ModelSerializer):
    answer_choices = AnswerChoiceSerializer(many=True, read_only=True)
    question_set = serializers.PrimaryKeyRelatedField(
        queryset=QuestionSet.objects.all()
    )
    FIELD_KEYS = [
        "order",
        "slug",
        "text",
        "question_set",
    ]

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "answer_choices",
            "question_set",
            "order",
            "slug",
        ]


class QuestionSetSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    questionnaire = serializers.PrimaryKeyRelatedField(
        queryset=Questionnaire.objects.all()
    )
    FIELD_KEYS = [
        "title",
        "description",
        "questionnaire",
        "order",
    ]

    class Meta:
        model = QuestionSet
        fields = [
            "id",
            "title",
            "order",
            "description",
            "questions",
            "questionnaire",
        ]


class QuestionnaireSerializer(serializers.ModelSerializer):
    question_sets = QuestionSetSerializer(many=True, read_only=True)
    FIELD_KEYS = [
        "slug",
        "title",
        "description",
    ]

    class Meta:
        model = Questionnaire
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "question_sets",
        ]


class QuestionnaireResultsSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "questionnaire",
        "contact_name",
        "contact_email",
    ]

    class Meta:
        model = QuestionnaireResults
        fields = [
            "id",
            "questionnaire",
            "results",
            "contact_name",
            "contact_email",
            "contact_phone",
            "contact_state",
        ]

    def create(self, validated_data):
        instance = super().create(validated_data)
        results_data = validated_data.pop("results")
        results = []

        for question_id, answer in results_data.items():
            question = Question.objects.get(id=question_id)
            if isinstance(answer, int):
                answer_choice = AnswerChoice.objects.get(id=answer)

                results.append(
                    QuestionnaireResultAnswer(
                        questionnaire_result=instance,
                        question=question,
                        question_text=question.text,
                        answer_choice=answer_choice,
                        answer_choice_text=answer_choice.text,
                    )
                )
            else:
                for answer_id in answer:
                    answer_choice = AnswerChoice.objects.get(id=answer_id)
                    results.append(
                        QuestionnaireResultAnswer(
                            questionnaire_result=instance,
                            question=question,
                            question_text=question.text,
                            answer_choice=answer_choice,
                            answer_choice_text=answer_choice.text,
                        )
                    )

        QuestionnaireResultAnswer.objects.bulk_create(results)

        return instance


class QuestionnaireResultAnswerSerializer(serializers.ModelSerializer):
    FIELD_KEYS = [
        "question",
        "answer_choice",
        "question_text",
        "answer_choice_text",
    ]

    class Meta:
        model = QuestionnaireResultAnswer
        fields = [
            "id",
            "question",
            "answer_choice",
            "question_text",
            "answer_choice_text",
        ]


QuestionnaireResultAnswer.serializer_class = QuestionnaireResultAnswerSerializer
QuestionnaireResults.serializer_class = QuestionnaireResultsSerializer
Questionnaire.serializer_class = QuestionnaireSerializer
QuestionSet.serializer_class = QuestionSetSerializer
Question.serializer_class = QuestionSerializer
AnswerChoice.serializer_class = AnswerChoiceSerializer
