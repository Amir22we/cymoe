from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

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
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)
        
    def get_absolute_url(self):
        return reverse("blog:detail_post_all", kwargs={"id": self.id,
                                                       "year": self.publish.year,
                                                       "month": self.publish.month,
                                                       "day": self.publish.day,
                                                       "slug": self.slug
                                                       })
    