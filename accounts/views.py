from django.urls import reverse_lazy
from django.views import generic
from .forms import SignUpForm, LoginForm, UpdateProfileForm, UpdateUserForm, CheckProfile
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required 
from django.contrib.auth.models import User

class SignUpView(generic.CreateView):
    form_class = SignUpForm
    initial = None 
    template_name = 'registration/register.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect(to='/')
        return super(SignUpView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            form.save()

            username = form.cleaned_data.get('username')
            messages.info(request, f'Аккаунт для {username} успешно создан')

            return redirect(to='login')

        return render(request, self.template_name, {'form': form})
    
class CustomLoginView(LoginView):
    form_class = LoginForm

    def form_valid(self, form):
        remeber_me = form.cleaned_data.get('remeber_me')

        if not remeber_me:
            self.request.session.set_expiry(0)
            self.request.session.modified = True

        return super(CustomLoginView, self).form_valid(form)

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UpdateUserForm(request.POST, instance=request.user)
        profile_form = UpdateProfileForm(request.POST, request.FILES, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Ваш профиль успешно обновлен')
            return redirect(to='accounts:profile')
        
    else:
        user_form = UpdateUserForm(instance=request.user)
        profile_form = UpdateProfileForm(instance=request.user.profile)

    return render(request, 'profile/profile.html', {'user_form': user_form, 'profile_form': profile_form})
    
        
def check_profile(request):
    username = None
    email = None
    result = None
    form = CheckProfile()
    if form.is_valid():
        username = form.cleaned_data['username']
        email = form.cleaned_data['email']
        result = User.objects.filter(username__icontains=username, email__icontains=email)
    else:
        form = CheckProfile(request.POST)
    return render(request, 'profile/check_profile.html', {'form': form, 'username': username, 'email': email, 'result': result})
            