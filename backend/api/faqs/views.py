from django.shortcuts import render
from api.custom_views import *
from .models import *
from .serializers import *


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

    # def post(self, request, *args, **kwargs):
    #     items_data = {}
    #     list_data = {}
    #     for key, value in request.data.items():
    #         if key == "name":
    #             list_data["name"] = value
    #         elif key == "type":
    #             list_data["type"] = value
    #         elif key.startswith("listItems"):
    #             key_parts = key.split("[")
    #             item_index = int(key_parts[1][:-1])
    #             item_key = key_parts[2][:-1]
    #             if item_index not in items_data:
    #                 items_data[item_index] = {}
    #             if item_key == "image":
    #                 items_data[item_index][item_key] = request.FILES.get(key)
    #             else:
    #                 items_data[item_index][item_key] = value

    #     created_list = ListElement(**list_data)

    #     items_list = list(items_data.values())
    #     created_items = []
    #     for item_data in items_list:
    #         tag = item_data.pop("tag")
    #         tag_obj, created = ListItemTag.objects.get_or_create(name=tag)
    #         item_data["tag"] = tag_obj

    #         created_item = ListElementItem.objects.create(**item_data)
    #         created_items.append(created_item)

    #     created_list.save()
    #     created_list.items.set(created_items)
    #     serializer = self.get_serializer(created_list)

    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
