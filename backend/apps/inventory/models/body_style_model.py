from django.db import models
from django.utils.translation import gettext_lazy as _

from base.models import BaseModel


class BodyStyle(models.Model):
    body = models.CharField(
        max_length=100,
        verbose_name=_("Body Style")
    )
    status = models.CharField(
        max_length=12,
        choices=BaseModel.StatusChoices.choices,
        default=BaseModel.StatusChoices.PUBLISHED,
        verbose_name=_("Status")
    )

    def __str__(self):
        return self.body

    class Meta:
        verbose_name = "Body Style"
        verbose_name_plural = "Body Styles"
        db_table = "tbl_body_style"
