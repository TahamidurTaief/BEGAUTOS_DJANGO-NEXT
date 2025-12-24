#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv


if __name__ == "__main__":

    # Loading environment variables file
    load_dotenv(
        os.path.join(os.path.dirname(__file__), '.env')
    )

    if os.environ.get('JTRO_ENVIRONMENT') == "production":
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.dev")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
