from rest_framework import generics, status
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from .models import User, Articles, Tags
from .serializers import ArticleSerializer, TagsSerializer
from authorization.authentication import JWTTokenAuthentication
import jwt
from django.contrib import admin
from django.shortcuts import render
from auditlog.models import LogEntry
from api.utils import create_log_entry, return_changes


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticleSerializer

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
            instance = serializer.create(validated_data=data, username=user)

            create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)

    def perform_create(self, serializer):
        return serializer.save()


class RecentArticlesView(ArticleListCreateView):
    def get(self, request, *args, **kwargs):
        recent_articles = self.queryset.order_by("-created_at")[:3]
        serializer = self.serializer_class(recent_articles, many=True)

        return JsonResponse(serializer.data, safe=False)


class HighlightedArticlesView(generics.ListCreateAPIView):
    queryset = Articles.objects.filter(is_highlighted=True)
    serializer_class = ArticleSerializer


class ArticleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticleSerializer

    def update(self, request, *args, **kwargs):
        article = self.get_object()
        old_instance = Articles.objects.get(pk=article.pk)
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

            changes = return_changes(article, old_instance)
            create_log_entry(LogEntry.Action.UPDATE, request.username, article, changes)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)


class TagsView(generics.ListCreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)

        create_log_entry(LogEntry.Action.CREATE, request.username, instance, None)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        return serializer.save()


class TagsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_instance = Tags.objects.get(pk=instance.pk)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        changes = return_changes(instance, old_instance)
        create_log_entry(LogEntry.Action.UPDATE, request.username, instance, changes)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        create_log_entry(LogEntry.Action.DELETE, request.username, instance, None)

        return Response(status=status.HTTP_204_NO_CONTENT)
