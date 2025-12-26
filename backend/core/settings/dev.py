from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

INSTALLED_APPS = INSTALLED_APPS + [
    'django_extensions',
    'drf_yasg',
]

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# if os.environ.get('JTRO_DEV_DATABASE') == "postgres":
    # DATABASES = {
    #     'default': {
    #         'ENGINE': os.environ.get('JTRO_DEV_DATABASE_ENGINE'),
    #         'NAME': os.environ.get('JTRO_DEV_DATABASE_NAME'),
    #         'USER': os.environ.get('JTRO_DEV_DATABASE_USER'),
    #         'PASSWORD': os.environ.get('JTRO_DEV_DATABASE_PASSWORD'),
    #         'HOST': os.environ.get('JTRO_DEV_DATABASE_HOST'),
    #         'PORT': os.environ.get('JTRO_DEV_DATABASE_PORT'),
    #     }
    # }
#     DATABASES = {
#         'default': {
#             'ENGINE': "django.db.backends.postgresql_psycopg2",
#             'NAME': 'db_begautos',
#             'USER': "bautos",
#             'PASSWORD': "Jca2y90Z$2",
#             'HOST': "localhost",
#             'PORT': "5432",
#         }
#     }
# else:
#     DATABASES = {
#         "default": {
#             "ENGINE": "django.db.backends.sqlite3",
#             "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
#         }
#     }



DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
        }
    }



SWAGGER_SETTINGS = {
    'DEFAULT_FIELD_INSPECTORS': [
        'drf_yasg.inspectors.CamelCaseJSONFilter',
        'drf_yasg.inspectors.InlineSerializerInspector',
        'drf_yasg.inspectors.RelatedFieldInspector',
        'drf_yasg.inspectors.ChoiceFieldInspector',
        'drf_yasg.inspectors.FileFieldInspector',
        'drf_yasg.inspectors.DictFieldInspector',
        'drf_yasg.inspectors.SimpleFieldInspector',
        'drf_yasg.inspectors.StringDefaultFieldInspector',
    ],
}
