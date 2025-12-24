from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from core.utils import images_path_dir


class InventoryImage(models.Model):
    inventory = models.ForeignKey(
        'inventory.Inventory',
        on_delete=models.CASCADE,
        related_name='inventory_images',
        verbose_name=_("Inventory")
    )
    caption = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("Caption")
    )
    image = models.FileField(
        upload_to=images_path_dir,
        validators=[FileExtensionValidator(
            ['jpg', 'jpeg', 'png']
        )],
        help_text=_("jpg, jpeg, png"),
        verbose_name=_("Image")
    )

    def __str__(self):
        return f"Image for {self.inventory.name}"

    class Meta:
        verbose_name = "Inventory Image"
        verbose_name_plural = "Inventory Images"
        db_table = "tbl_inventory_images"
