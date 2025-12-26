"""
 Version: 1.0.0
 Author: Abdullah Al Mohin Jaki
"""

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

__all__ = ["LOGGING"]

# checking log folder has exists or not if not create the log folder
path = BASE_DIR + "/app_logs"
if not os.path.exists(path):
    os.makedirs(path)

# LOG SETUP #
# Prefer a concurrent-safe rotating handler on Windows to avoid PermissionError (WinError 32)
# If you want the best behavior on Windows, install the package:
#   pip install ConcurrentLogHandler
# It provides `concurrent_log_handler.ConcurrentRotatingFileHandler` which avoids file locking between processes.

# Allow disabling all logging via env var: JTRO_DISABLE_LOGGING=1
if os.environ.get('JTRO_DISABLE_LOGGING') == "1":
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': True,
        'handlers': {
            'null': {
                'class': 'logging.NullHandler',
            }
        },
        'root': {
            'handlers': ['null'],
            'level': 'CRITICAL',
        },
    }
else:
    try:
        # prefer concurrent handler when available
        import concurrent_log_handler  # noqa: F401
        FILE_ROTATING_CLASS = 'concurrent_log_handler.ConcurrentRotatingFileHandler'
        # use size-based rotation for concurrent handler
        FILE_ROTATING_KWARGS = {'maxBytes': 10 * 1024 * 1024, 'backupCount': 10, 'delay': True}
    except Exception:
        # fallback to timed rotating handler
        FILE_ROTATING_CLASS = 'logging.handlers.TimedRotatingFileHandler'
        FILE_ROTATING_KWARGS = {'when': 'MIDNIGHT', 'delay': True}

    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
            },
            'debug_file': {
                'level': 'DEBUG',
                'filename': os.path.join(BASE_DIR, 'app_logs', 'django_debug.log'),
                'class': FILE_ROTATING_CLASS,
                'formatter': 'main_formatter',
                **FILE_ROTATING_KWARGS,
            },
            'general_file': {
                'level': 'DEBUG',
                'filename': os.path.join(BASE_DIR, 'app_logs', 'app_general.log'),
                'class': FILE_ROTATING_CLASS,
                'formatter': 'main_formatter',
                **FILE_ROTATING_KWARGS,
            },
            'exceptions_file': {
                'level': 'DEBUG',
                'filename': os.path.join(BASE_DIR, 'app_logs', 'exceptions.log'),
                'class': FILE_ROTATING_CLASS,
                'formatter': 'main_formatter',
                **FILE_ROTATING_KWARGS,
            },
        },
        'formatters': {
            'main_formatter': {
                'format': '%(levelname)s | %(asctime)s | %(filename)s | %(module)s:%(funcName)s:%(lineno)d | %(message)s',
                'datefmt': "%Y-%m-%d %H:%M:%S",
            },
        },
        'loggers': {
            'django': {
                'handlers': ['console', 'debug_file'],
                'level': 'DEBUG',
                'propagate': True,
            },
            'django.utils.autoreload': {
                'handlers': ['debug_file'],
                'level': 'ERROR',
                'propagate': True,
            },
            'django.db.backends': {
                'handlers': ['debug_file'],
                'level': 'INFO',
                'propagate': True,
            },
            'general': {
                'handlers': ['general_file'],
                'level': 'DEBUG',
                'propagate': True,
            },
            'exceptions_log': {
                'handlers': ['exceptions_file'],
                'level': 'DEBUG',
                'propagate': True,
            },

            'django.template': {
                'handlers': ['debug_file'],
                'level': 'INFO',
                'propagate': True,
            },
            'parso': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False,
            },
        },
    }
# LOG SETUP END #
