from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from blog.models import Post
from .serializers import PostSerializer
from .permissions import IsAuthOrReadOnly


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["author"]
    permission_classes = (IsAuthOrReadOnly,)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthOrReadOnly,)

class UserPostList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.kwargs['id']
        return Post.objects.filter(author=user)
