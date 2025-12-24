from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from base.models import BaseModel
from core.utils import images_path_dir


class Brand(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name=_("Heading")
    )
    image = models.FileField(
        upload_to=images_path_dir,
        validators=[FileExtensionValidator(
            ['jpg', 'jpeg', 'png']
        )],
        help_text=_("jpg, jpeg, png"),
        verbose_name=_("Image")
    )
    status = models.CharField(
        max_length=12,
        choices=BaseModel.StatusChoices.choices,
        default=BaseModel.StatusChoices.PUBLISHED,
        verbose_name=_("Status")
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Car Brand"
        verbose_name_plural = "Car Brands"
        db_table = "tbl_brand"
