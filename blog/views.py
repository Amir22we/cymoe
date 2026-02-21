from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from .forms import RegisterUserForm, LoginForm, PostForm, ChangeName, EmaiPostForm
from .models import Post
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from django.utils.text import slugify
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings

# Главная страница
def index(request):
    return render(request, 'index/index.html')

# Профиль
def register(request):
    if request.user.is_authenticated:
        return redirect('blog:profile')
    
    if request.method == "POST":
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('blog:index')
    else:
        form = RegisterUserForm()
    return render(request, 'registration/register.html', {"form": form})

# Выходи с аккаунта
def logout_user(request):
    logout(request)
    return redirect('blog:index')

# Вход в аккаунт
def login_user(request):
    if request.user.is_authenticated:
        return redirect('blog:profile')

    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('blog:profile')
            else:
                form.add_error(None, "Неверный логин или пароль.")
    else:
        form = LoginForm()

    return render(request, 'registration/login.html', {'form': form})


# Профиль
def profile(request):
    return render(request, 'profile/profile.html')

# Создание записи
def create_note(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user 
            post.slug = slugify(post.title)
            post.save()
            return redirect('blog:just_created_note')
    else:
        form = PostForm()
    return render(request, 'notes/create_note.html', {'form': form})


# Записи пользователей
def user_note(request):
    posts = Post.objects.filter(author=request.user)
    return render(request, 'notes/user_note.html', {'posts': posts})


# Просмотр всех записей
def view_note(request):
    posts = Post.objects.all()
    paginator = Paginator(posts, 6)
    page_number = request.GET.get('page', 1)
    try:
        posts = paginator.page(page_number)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    except PageNotAnInteger:
        posts = paginator.page(1)
    return render(request, 'notes/view_note.html', {'posts': posts})


# Только что созданная запись (redirect с create_note)
def just_created_note(request):
    post = Post.objects.filter(author=request.user).latest()
    return render(request, 'notes/just_created_note.html', {'post': post})


# Просмотр поста
def detail_note(request, id):
    post = get_object_or_404(Post, id=id)
    return render(request, 'notes/detail_post.html', {'post': post})


# Просмотр всех постов
def detail_note_all(request, id, slug, year, month, day):
    post = get_object_or_404(Post, id=id, slug=slug, publish__year=year, publish__month=month, publish__day=day)
    return render(request, 'notes/detail_post_all.html', {'post': post})


# Изменить имя
def change_name(request):
    if request.method == "POST":
        form = ChangeName(request.POST)
        if form.is_valid():
            request.user.username = form.cleaned_data['username']
            request.user.save()
            return redirect('blog:profile')
    else:
        form = ChangeName()
    return render(request, 'profile/change_name.html', {'form': form})


# Изменить пароль
def change_pass(request):
    if request.method == "POST":
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('blog:profile')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'profile/change_pass.html', {'form': form})


# Удаление акканта
def delete_profile(request):
    if request.method == "POST":
        user = request.user
        user.delete()
        return redirect('blog:register')
    return render(request, 'profile/delete_profile.html')

# Отправка постов
def post_share(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    sent = False
    if request.method == "POST":
        form = EmaiPostForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            post_url = request.build_absolute_uri(post.get_absolute_url())
            subject = f"{cd['name']} рекомендует " \
                      f"{post.title}"
            message = f"Читай {post.title} в {post_url}\n\n" \
                      f"{cd['name']}\s ({cd['email']}) Комент: {cd['comments']}"
            send_mail(subject, message, settings.EMAIL_HOST_USER, [cd['to']])

            sent = True

    else:   
        form = EmaiPostForm()

    return render(request, 'notes/share.html', {'post': post, 'form': form, 'sent': sent})