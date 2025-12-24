from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('JTRO_DEBUG') != 'False'

INSTALLED_APPS = INSTALLED_APPS + [

]

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('JTRO_DATABASE_ENGINE'),
        'NAME': os.environ.get('JTRO_DATABASE_NAME'),
        'USER': os.environ.get('JTRO_DATABASE_USER'),
        'PASSWORD': os.environ.get('JTRO_DATABASE_PASSWORD'),
        'HOST': os.environ.get('JTRO_DATABASE_HOST'),
        'PORT': os.environ.get('JTRO_DATABASE_PORT'),
    }
}

if os.environ.get('JTRO_SSL_ENABLED') == 'True':
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
