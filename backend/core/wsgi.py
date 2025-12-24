import os

from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv


# Loading environment variables file
load_dotenv(
    os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
)

if os.environ.get('JTRO_ENVIRONMENT') == "production":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.dev")

application = get_wsgi_application()
