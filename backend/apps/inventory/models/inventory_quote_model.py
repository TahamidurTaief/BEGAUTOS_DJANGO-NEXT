from django.db import models
from django.utils.translation import gettext_lazy as _

from base.models import BaseModel


class InventoryQuote(BaseModel):
    car = models.ForeignKey(
        'inventory.Inventory',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='quotes',
        verbose_name=_('Car'),
    )
    name = models.CharField(
        max_length=100,
        verbose_name=_("Full Name")
    )
    email = models.EmailField(
        max_length=32,
        verbose_name=_("Email")
    )
    phone = models.CharField(
        max_length=18,
        verbose_name=_("Phone")
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Inventory Get a Quote"
        verbose_name_plural = "Inventory Get a Quote"
        db_table = "tbl_inventory_quote"
