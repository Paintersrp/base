from rest_framework import generics
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from .models import User, Articles, Tags
from .serializers import ArticleSerializer, TagsSerializer
from authorization.authentication import JWTTokenAuthentication
import jwt
from django.contrib import admin
from django.shortcuts import render


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticleSerializer
    # authentication_classes = [JWTTokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        authorization_header = request.headers.get("Authorization")

        if not authorization_header:
            return Response({"error": "Missing authorization header"}, status=401)

        token = authorization_header.split(" ")[1]
        username = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
        user = User.objects.get(username=username["user"])

        form_data = request.POST
        title = form_data.get("title")
        content = form_data.get("content")
        tags = form_data.get("tags")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
        else:
            image = None

        data = {"title": title, "content": content, "tags": tags, "image": image}

        if isinstance(data.get("tags"), str):
            tags = data["tags"].split(",")
            data["tags"] = [{"name": tag.strip()} for tag in tags]

        serializer = ArticleSerializer(data=data)

        if serializer.is_valid():
            data["content"] = data["content"].replace("<img", "<img class='media'")
            serializer.create(validated_data=data, username=user)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)


class RecentArticlesView(ArticleListCreateView):
    def get(self, request, *args, **kwargs):
        recent_articles = self.queryset.order_by("-created_at")[:3]
        serializer = self.serializer_class(recent_articles, many=True)

        return JsonResponse(serializer.data, safe=False)


class HighlightedArticlesView(generics.ListCreateAPIView):
    queryset = Articles.objects.filter(is_highlighted=True)
    serializer_class = ArticleSerializer


# class HighlightedArticlesView(ArticleListCreateView):
#     def get(self, request, *args, **kwargs):
#         highlighted_articles = self.queryset.filter(is_highlighted=True)
#         serializer = self.serializer_class(highlighted_articles, many=True)
#         print(serializer.data)

#         return JsonResponse(serializer.data, safe=False)


class ArticleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticleSerializer

    def update(self, request, *args, **kwargs):
        article = self.get_object()
        form_data = request.POST
        title = form_data.get("title")
        content = form_data.get("content")
        tags = form_data.get("tags")

        if request.FILES.get("image"):
            image = request.FILES.get("image")
            article.image.storage.delete(article.image.path)
            article.image = image
            data = {"title": title, "content": content, "tags": tags, "image": image}
        else:
            data = {"title": title, "content": content, "tags": tags}

        if isinstance(data.get("tags"), str):
            tags = data["tags"].split(",")
            data["tags"] = [{"name": tag.strip()} for tag in tags]

        serializer = ArticleSerializer(article, data=data)

        if serializer.is_valid():
            data["content"] = data["content"].replace("<img", "<img class='media'")
            serializer.update(article, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)


class TagsView(generics.ListCreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer


class TagsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
