from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from base.models import BaseModel
from core.utils import images_path_dir


class PeopleTalkAboutUs(BaseModel):
    title = models.CharField(
        max_length=300,
        verbose_name=_("Title")
    )
    image = models.FileField(
        upload_to=images_path_dir,
        validators=[FileExtensionValidator(
            ['jpg', 'jpeg', 'png']
        )],
        help_text=_("jpg, jpeg, png"),
        verbose_name=_("Image")
    )
    url = models.URLField(
        max_length=300,
        null=True,
        blank=True,
        verbose_name=_("URL")
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name=_("Is featured?")
    )
    status = models.CharField(
        max_length=12,
        choices=BaseModel.StatusChoices.choices,
        default=BaseModel.StatusChoices.PUBLISHED,
        verbose_name=_("Status")
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "BEG across socials"
        verbose_name_plural = "BEG across socials"
        db_table = "tbl_people_talk"
