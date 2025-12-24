from django.db import models
from django.utils.translation import gettext_lazy as _

from base.models import BaseModel


class SalesRepresentative(BaseModel):
    name = models.CharField(
        max_length=100,
        verbose_name=_('Name'),
    )
    phone_number = models.CharField(
        max_length=15,
        verbose_name=_('Phone number'),
    )
    status = models.CharField(
        max_length=12,
        choices=BaseModel.StatusChoices.choices,
        default=BaseModel.StatusChoices.PUBLISHED,
        verbose_name=_('Status'),
    )

    def __str__(self):
        return f"{self.name} - {self.phone_number}"

    class Meta:
        verbose_name = _('Sales Representative')
        verbose_name_plural = _('Sales Representatives')
        ordering = ('name',)
        db_table = "tbl_sales_representative"
