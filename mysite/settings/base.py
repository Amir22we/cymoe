from pathlib import Path
import os

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "django-insecure-dev-only-change-me")
DEBUG = False

ALLOWED_HOSTS = []
SITE_ID = int(os.getenv("SITE_ID", "1"))

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.sitemaps",
    "django.contrib.postgres",

    "whitenoise.runserver_nostatic",

    "blog",
    "taggit",
    "accounts.apps.AccountsConfig",
    "anymail",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.telegram",
    "allauth.socialaccount.providers.github",
    "allauth.socialaccount.providers.google",
    "django_bootstrap5",
    "rest_framework",
    "blog_api.apps.BlogApiConfig",
    "django_filters",
    "rest_framework.authtoken",
    "drf_spectacular",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "mysite.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "mysite.wsgi.application"
ASGI_APPLICATION = "mysite.asgi.application"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en"
TIME_ZONE = "Asia/Tashkent"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/accounts/logout/"
LOGIN_URL = "/accounts/login/"

SESSION_COOKIE_AGE = 60 * 60 * 24 * 30

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 3,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Blog API Project",
    "DESCRIPTION": "A sample blog",
    "VERSION": "1.0.0",
}

EMAIL_BACKEND = "anymail.backends.brevo.EmailBackend"

ANYMAIL = {
    "BREVO_API_KEY": os.getenv("BREVO_API_KEY", ""),
}

DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "student1380@tuit.uz")
SERVER_EMAIL = DEFAULT_FROM_EMAIL

SOCIALACCOUNT_PROVIDERS = {
    "telegram": {
        "APP": {
            "client_id": os.getenv("TELEGRAM_BOT_ID", ""),
            "secret": os.getenv("TELEGRAM_BOT_TOKEN", ""),
        },
        "AUTH_PARAMS": {
            "auth_date_validity": int(os.getenv("TELEGRAM_AUTH_DATE_VALIDITY", "30")),
        },
    },
    "github": {
        "APP": {
            "client_id": os.getenv("SOCIAL_AUTH_GITHUB_KEY", ""),
            "secret": os.getenv("SOCIAL_AUTH_GITHUB_SECRET", ""),
        },
    },
    "google": {
        "APP": {
            "client_id": os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY", ""),
            "secret": os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET", ""),
        },
    },
}