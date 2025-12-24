from django.db import models
from django.utils.translation import gettext_lazy as _

from base.models import BaseModel


class ModelGeneration(models.Model):
    brand = models.ForeignKey(
        'inventory.Brand',
        on_delete=models.CASCADE,
        related_name='model_generations_brand',
        verbose_name=_("Brand")
    )
    model = models.CharField(
        max_length=100,
        verbose_name=_("Model")
    )
    status = models.CharField(
        max_length=12,
        choices=BaseModel.StatusChoices.choices,
        default=BaseModel.StatusChoices.PUBLISHED,
        verbose_name=_("Status")
    )

    def __str__(self):
        return self.model

    class Meta:
        verbose_name = "Model Generation"
        verbose_name_plural = "Model Generations"
        db_table = "tbl_model_generations"
