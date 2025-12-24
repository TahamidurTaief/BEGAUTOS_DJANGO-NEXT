from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from core.utils import images_path_dir


class SellCar(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name=_("Your Name")
    )
    phone = models.CharField(
        max_length=18,
        verbose_name=_("Your Phone Number")
    )
    car_name = models.CharField(
        max_length=100,
        verbose_name=_("Car Name")
    )
    car_model = models.CharField(
        max_length=100,
        verbose_name=_("Car Model")
    )
    car_year = models.CharField(
        max_length=100,
        verbose_name=_("Car Year")
    )
    offered_price = models.PositiveBigIntegerField(
        null=True,
        blank=True,
        verbose_name=_("Offered Price")
    )
    mileage = models.PositiveIntegerField(
        verbose_name=_("Mileage")
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Ready to sell your car?"
        verbose_name_plural = "Ready to sell your car?"
        db_table = "tbl_sellcar"
