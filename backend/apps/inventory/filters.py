from random import choices

import django_filters
from apps.inventory.models import Inventory, Brand, ModelGeneration, BodyStyle

from django_filters.filters import BaseInFilter

class CharInFilter(BaseInFilter, django_filters.CharFilter):
    pass


class InventoryFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    brand = django_filters.CharFilter(field_name="brand__name", lookup_expr='icontains')
    model = django_filters.CharFilter(field_name="model__model", lookup_expr='icontains')
    body_style = django_filters.ModelChoiceFilter(queryset=BodyStyle.objects.all())
    inventory_type = django_filters.ChoiceFilter(choices=Inventory.InventoryTypeChoices.choices)
    registered = django_filters.ChoiceFilter(choices=Inventory.AvailabilityChoices.choices)
    car_type = CharInFilter(field_name="car_type", lookup_expr='in')

    class Meta:
        model = Inventory
        fields = [
            'brand',
            'model',
            'engine_capacity',
            'body_style',
            'registered',
            'inventory_type',
            'car_type',
        ]
