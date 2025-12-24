from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from core.utils import images_path_dir


class Slider(models.Model):
    heading = models.CharField(
        max_length=100,
        verbose_name=_("Heading")
    )
    image = models.FileField(
        upload_to=images_path_dir,
        verbose_name=_("Video")
    )

    def __str__(self):
        return self.heading

    class Meta:
        verbose_name = "Slider Video"
        verbose_name_plural = "Slider Video"
        db_table = "tbl_video"
