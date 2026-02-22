from django import forms
from django.contrib.auth.models import User
from .models import Post, Comment

class RegisterUserForm(forms.ModelForm):
    username = forms.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ("username",)

    def clean(self):
        cleaned_data = super().clean()
        p1 = cleaned_data.get('password')
        p2 = cleaned_data.get('password2')

        if p1 and p2 and p1 != p2:
            raise forms.ValidationError("Пароли не совпадают")

        return cleaned_data
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
    
class LoginForm(forms.Form):
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={'class':'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'}))

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'text', 'tags', ]
    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class ChangeName(forms.ModelForm):
    class Meta:
        model = User
        fields = ("username", )

class EmaiPostForm(forms.Form):
    name = forms.CharField(max_length=25)
    email = forms.EmailField()
    to = forms.EmailField()
    comments = forms.CharField(required=False, widget=forms.Textarea)
    
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['name', 'email', 'body']
    
