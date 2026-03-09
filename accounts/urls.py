from django.urls import path
from .views import SignUpView, CustomLoginView, profile, check_profile
from django.contrib.auth import views as auth_views


app_name = 'accounts'

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', CustomLoginView.as_view(redirect_authenticated_user=True, template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name = 'registration/logout.html'), name='logout'),
    path('profile/', profile, name='profile'),
    path('check_profile/', check_profile, name='check_profile')
]
