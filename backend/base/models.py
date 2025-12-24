from django.db import models
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    class StatusChoices(models.TextChoices):
        PUBLISHED = 'PUBLISHED', _('PUBLISHED')
        UNPUBLISHED = 'UNPUBLISHED', _('UNPUBLISHED')
        ARCHIVED = 'ARCHIVED', _('ARCHIVED')

    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False
    )

    class Meta:
        abstract = True
        app_label = 'base'
