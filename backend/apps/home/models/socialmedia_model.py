from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from core.utils import images_path_dir


class SocialMedia(models.Model):
    facebook = models.URLField(
        max_length=300,
        verbose_name=_("Facebook")
    )
    instagram = models.URLField(
        max_length=300,
        null=True,
        blank=True,
        verbose_name=_("Instagram")
    )
    twitter = models.URLField(
        max_length=300,
        null=True,
        blank=True,
        verbose_name=_("X")
    )
    youtube = models.URLField(
        max_length=300,
        null=True,
        blank=True,
        verbose_name=_("Youtube")
    )

    class Meta:
        verbose_name = "Social Media"
        verbose_name_plural = "Social Media"
        db_table = "tbl_socialmedia"
