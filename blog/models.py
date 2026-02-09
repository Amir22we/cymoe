from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

class Post(models.Model):

    title = models.CharField(max_length=100, unique=False)
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)
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
    
    # Автогенерация slug
    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            self.slug = base
            counter = 1
            
            while Post.objects.filter(slug=self.slug).exists():
                counter += 1
                self.slug = f"{base}-{counter}"
        super().save(*args, **kwargs)

