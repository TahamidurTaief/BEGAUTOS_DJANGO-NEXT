from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from core.utils import images_path_dir


class SellYourCarImages(models.Model):
    sellcar = models.ForeignKey(
        'home.SellCar',
        on_delete=models.CASCADE,
        related_name='inventory_images',
        verbose_name=_("Sell Car")
    )
    image = models.FileField(
        upload_to=images_path_dir,
        validators=[FileExtensionValidator(
            ['jpg', 'jpeg', 'png']
        )],
        help_text=_("jpg, jpeg, png"),
        verbose_name=_("Image")
    )

    class Meta:
        verbose_name = "Ready to sell your car? Image"
        verbose_name_plural = "Ready to sell your car? Images"
        db_table = "tbl_sell_your_cars_images"
