from rest_framework import generics
from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from .models import User, Article
from .serializers import ArticleSerializer
from authorization.authentication import JWTTokenAuthentication
import jwt


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
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
            serializer.create(validated_data=data, username=user)

            return JsonResponse(serializer.data, status=201)

        return JsonResponse(serializer.errors, status=400)


class RecentArticlesView(ArticleListCreateView):
    def get(self, request, *args, **kwargs):
        recent_articles = self.queryset.order_by("-created_at")[:3]
        serializer = self.serializer_class(recent_articles, many=True)

        return JsonResponse(serializer.data, safe=False)


class HighlightedArticlesView(ArticleListCreateView):
    def get(self, request, *args, **kwargs):
        highlighted_articles = self.queryset.filter(is_highlighted=True)
        serializer = self.serializer_class(highlighted_articles, many=True)

        return JsonResponse(serializer.data, safe=False)


class ArticleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
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

        if isinstance(data.get("tags"), str):
            tags = data["tags"].split(",")
            data["tags"] = [{"name": tag.strip()} for tag in tags]

        serializer = ArticleSerializer(article, data=data)

        if serializer.is_valid():
            serializer.update(article, validated_data=data)

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors, status=400)
