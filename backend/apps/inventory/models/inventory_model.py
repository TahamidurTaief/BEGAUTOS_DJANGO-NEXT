from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from tinymce.models import HTMLField

from base.models import BaseModel
from core.utils import images_path_dir


class Inventory(BaseModel):
    class AvailabilityChoices(models.TextChoices):
        AVAILABLE = "Available", _("Available")
        SOLD = "Sold", _("Sold")
        BOOKED = "Booked", _("Booked")

    class CarTypeChooser(models.TextChoices):
        RECOMMENDATION = 'RECONDITIONED', _('RECONDITIONED')
        BRAND_NEW = 'BRAND_NEW', _('BRAND NEW')
        PRE_OWNED = 'PRE_OWNED', _('PRE OWNED')

    class ConditionChoices(models.TextChoices):
        NEW = 'NEW', _('NEW')
        USED = 'USED', _('USED')

    class TransmissionChoices(models.TextChoices):
        MANUAL = 'MANUAL', _('MANUAL')
        AUTOMATIC = 'AUTOMATIC', _('AUTOMATIC')

    class FuelTypeChoices(models.TextChoices):
        PETROL = 'PETROL', _('PETROL')
        DIESEL = 'DIESEL', _('DIESEL')
        OCTANE = 'OCTANE', _('OCTANE')
        ELECTRIC = 'ELECTRIC', _('ELECTRIC')
        HYBRID = 'HYBRID', _('HYBRID')
        CNG = 'CNG', _('CNG')
        LPG = 'LPG', _('LPG')
        ETHANOL = 'ETHANOL', _('ETHANOL')
        HYDROGEN = 'HYDROGEN', _('HYDROGEN')
        BIO_DIESEL = 'BIO-DIESEL', _('BIO-DIESEL')
        FLEX_FUEL = 'FLEX-FUEL', _('FLEX-FUEL')
        PETROL_HYBRID = 'PETROL+HYBRID', _('PETROL+HYBRID')
        DIESEL_HYBRID = 'DIESEL+HYBRID', _('DIESEL+HYBRID')
        OCTANE_HYBRID = 'OCTANE+HYBRID', _('OCTANE+HYBRID')
        CNG_HYBRID = 'CNG+HYBRID', _('CNG+HYBRID')
        LPG_HYBRID = 'LPG+HYBRID', _('LPG+HYBRID')
        OTHERS = 'OTHERS', _('OTHERS')

    class InventoryTypeChoices(models.TextChoices):
        LUXURY = 'LUXURY', _('LUXURY')
        BUDGET_FRIENDLY = 'BUDGET FRIENDLY', _('BUDGET FRIENDLY')

    class SlightlyNegotiable(models.TextChoices):
        YES = "YES", _("YES")
        NO = "NO", _("NO")

    name = models.CharField(
        max_length=100,
        verbose_name=_("Name")
    )
    car_type = models.CharField(
        max_length=25,
        choices=CarTypeChooser.choices,
        null=True,
        blank=True,
        verbose_name=_("Car Type")
    )
    brand = models.ForeignKey(
        'inventory.Brand',
        on_delete=models.CASCADE,
        related_name='inventories_brand',
        verbose_name=_("Brand")
    )
    model = models.ForeignKey(
        'inventory.ModelGeneration',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='inventories_model',
        verbose_name=_("Model Generation")
    )
    year = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name=_("Reg. Year")
    )
    engine_capacity = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name=_("Engine Capacity (cc)")
    )
    fuel_type = models.CharField(
        max_length=20,
        choices=FuelTypeChoices.choices,
        verbose_name=_("Fuel Type")
    )
    mileage = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name=_("Mileage")
    )
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name=_("Price (BDT)")
    )
    transmission = models.CharField(
        max_length=20,
        choices=TransmissionChoices.choices,
        verbose_name=_("Transmission")
    )
    drive_type = models.CharField(
        max_length=50,
        verbose_name=_("Drive Type/Train"),
        blank=True,
        null=True
    )
    wheel_base = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name=_("Wheel")
    )
    color = models.CharField(
        max_length=30,
        verbose_name=_("Color/Exterior"),
        blank=True,
        null=True
    )
    condition = models.CharField(
        max_length=10,
        choices=ConditionChoices.choices,
        verbose_name=_("Condition")
    )
    registered = models.CharField(
        max_length=12,
        choices=AvailabilityChoices.choices,
        default=AvailabilityChoices.AVAILABLE,
        verbose_name=_("Availability")
    )
    body_style = models.ForeignKey(
        'inventory.BodyStyle',
        on_delete=models.SET_NULL,
        related_name='inventories_body_style',
        verbose_name=_("Body Style"),
        blank=True,
        null=True
    )
    feature_image = models.FileField(
        upload_to=images_path_dir,
        validators=[FileExtensionValidator(
            ['jpg', 'jpeg', 'png']
        )],
        help_text=_("jpg, jpeg, png"),
        null=True,
        blank=True,
        verbose_name=_("Image")
    )
    description = HTMLField(
        blank=True,
        null=True,
        verbose_name=_("Description")
    )
    youtube = models.URLField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name=_("Youtube URL")
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name=_("Is Featured?")
    )
    inventory_type = models.CharField(
        max_length=20,
        choices=InventoryTypeChoices.choices,
        default=InventoryTypeChoices.BUDGET_FRIENDLY,
        verbose_name=_("Inventory Type")
    )
    slightly_negotiable = models.CharField(
        max_length=5,
        choices=SlightlyNegotiable.choices,
        default=SlightlyNegotiable.YES,
        verbose_name=_("Is Slightly Negotiable?")
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
        verbose_name = "Inventory"
        verbose_name_plural = "Inventories"
        db_table = "tbl_inventories"
