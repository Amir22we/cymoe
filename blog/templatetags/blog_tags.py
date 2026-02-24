from django import template
from ..models import Post
from django.db.models import Count
from django.utils.safestring import mark_safe
import markdown
import nh3

register = template.Library()

@register.simple_tag
def total_posts():
    return Post.objects.count()

@register.inclusion_tag('notes/latest_posts.html')
def show_latest_posts(count=5):
    latest_posts = Post.objects.order_by('-publish')[:count]
    return {'latest_posts': latest_posts}

@register.simple_tag
def get_most_commented_posts(count=5):
    return Post.objects.annotate(total_comments=Count('comment')).exclude(total_comments=0).order_by('-total_comments')[:count]

@register.filter(name='markdown')
def markdown_format(text):
    clean_text = nh3.clean(markdown.markdown(text))
    return mark_safe(clean_text)