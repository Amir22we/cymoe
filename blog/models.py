from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse
from unidecode import unidecode
from taggit.managers import TaggableManager 
from taggit.models import TagBase, GenericTaggedItemBase

class Post(models.Model):

    title = models.CharField(max_length=100, unique=False)
    slug = models.SlugField(max_length=100, unique_for_date='publish')
    text = models.TextField(max_length=10000)

    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    created = models.DateTimeField(auto_now_add=True)
    publish = models.DateTimeField(default=timezone.now)

    # Сортировка
    class Meta:
        ordering = ['-publish']
        indexes = [
            models.Index(fields=['-publish']),
        ]
        get_latest_by = 'created'

    # Для тестов через shell
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.title))
        super().save(*args, **kwargs)
        
    def get_absolute_url(self):
        return reverse("blog:detail_post_all", kwargs={"id": self.id,
                                                       "year": self.publish.year,
                                                       "month": self.publish.month,
                                                       "day": self.publish.day,
                                                       "slug": self.slug
                                                       })
    def get_absolute_url(self):
        return reverse("blog:detail_note", kwargs={"id": self.id,
                                                       "year": self.publish.year,
                                                       "month": self.publish.month,
                                                       "day": self.publish.day,
                                                       "slug": self.slug
                                                       })


    
    tags = TaggableManager(through="TaggedPost", blank=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment')

    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ['created']
        indexes = [models.Index(fields=['created'])]

    def __str__(self):
        return f'Comment by {self.name} on {self.post}'
    
# Кастомный тэг
class CustomTag(TagBase):
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name))
        super().save(*args, **kwargs)

class TaggedPost(GenericTaggedItemBase):
    tag = models.ForeignKey(CustomTag, on_delete=models.CASCADE, related_name="tagged_posts")

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=200, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = self.user.username or str(self.user_id)
            self.slug = slugify(base)
        super().save(*args, **kwargs)

        
    def get_absolute_url(self):
        return reverse("blog:profile", kwargs={"id": self.id,
                                                       "slug": self.slug,
                                                       })
    