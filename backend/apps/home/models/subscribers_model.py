from django.db import models
from django.utils.translation import gettext_lazy as _


class Subscriber(models.Model):
    email = models.EmailField(
        max_length=32,
        unique=True,
        verbose_name=_("Email"),
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Subscriber"
        verbose_name_plural = "Subscribers"
        db_table = "tbl_subscribers"
