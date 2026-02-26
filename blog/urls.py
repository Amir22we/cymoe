from django.urls import path
from blog import views 
# from django.contrib.auth import views as auth_views

app_name = 'blog' 

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('profile/<str:username>', views.profile, name='profile'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('login_user/', views.login_user, name='login_user'),
    path('create_note/', views.create_note, name='create_note'),
    path('user_note/', views.user_note, name='user_note'),
    path('view_note/', views.view_note, name='view_note'),
    path('just_created_note/', views.just_created_note, name='just_created_note'),
    path('post/<int:id>/<int:year>/<int:month>/<int:day>/<str:slug>/', views.detail_note, name='detail_note'),
    path('post_all/<int:id>/<int:year>/<int:month>/<int:day>/<str:slug>/', views.detail_note_all, name='detail_post_all'),
    path('change_name/', views.change_name, name='change_name'),
    path('change_pass/', views.change_pass, name='change_pass'),
    path('delete_profile/', views.delete_profile, name='delete_profile'),
    path('<int:post_id>/share/', views.post_share, name='post_share'),
    path('<int:post_id>/comment/', views.post_comment, name='post_comment'),
    path('tag/<slug:tag_slug>/', views.view_note, name='view_note_by_tag'),
    path('search/', views.post_search, name='post_search')
]
