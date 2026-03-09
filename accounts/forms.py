from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import Profile
class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    username = forms.CharField(max_length=30)
    email = forms.EmailField(max_length=200)
    password1 = forms.CharField(max_length=50, widget=forms.PasswordInput)
    password2 = forms.CharField(max_length=50, widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email уже используется")
        return email

class LoginForm(AuthenticationForm):
    username = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(max_length=50, required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    remember_me = forms.BooleanField(required=True)

class UpdateUserForm(forms.ModelForm):
    username = forms.CharField(max_length=100, required=True, widget=forms.TextInput())
    email = forms.EmailField(required=True, widget=forms.TextInput())

    class Meta:
        model = User
        fields = ['username', 'email']


class UpdateProfileForm(forms.ModelForm):
    avatar = forms.ImageField(widget=forms.FileInput())
    bio = forms.CharField(widget=forms.Textarea(attrs={'rows': 5}))
    quote = forms.CharField(widget=forms.Textarea(attrs={'rows': 3}))

    class Meta:
        model = Profile
        fields = ['avatar', 'bio', 'quote']

class CheckProfile(forms.ModelForm):
    username = forms.CharField(required=True)
    email = forms.EmailField(required=True)

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username', '').strip()
        email = cleaned_data.get('email', '').strip()

        if not username and not email:
            raise forms.ValidationError('Введи хоть что то из этого')
    class Meta:
        model = User
        fields = ['username', 'email']