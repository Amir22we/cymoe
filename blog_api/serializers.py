from rest_framework import serializers
from blog.models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        read_only_fields = ("author", "created")
        fields = (
            "id",
            "author",
            "title",
            "text",
            "created",
            "slug",
        )
        model = Post