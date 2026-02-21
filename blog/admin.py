from django.contrib import admin
from .models import Post, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "author", "created")
    list_filter = ("created", "author")
    search_fields = ("title", "content", "author__username")
    ordering = ("-created",)
    list_per_page = 50

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'post', 'created', 'active']
    list_filter = ['active', 'created', 'updated']
    search_fields = ['name', 'email', 'body']

