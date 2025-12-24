from django.shortcuts import render
from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models.expressions import OrderBy
from django.db.models import Case, When, Value, IntegerField, F

from base.models import BaseModel
from apps.inventory.filters import (
    InventoryFilter
)
from apps.inventory.models import (
    Brand, ModelGeneration, BodyStyle, Inventory, InventoryImage, Stock, InventoryQuote
)
from apps.inventory.serializers import (
    InventoryListSerializer, InventoryDetailSerializer, BrandListSerializer, ModelGenerationListSerializer,
    BodyStyleListSerializer, StockListSerializer, InventoryQuoteCreateSerializer
)


class InventoryListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = InventoryListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = InventoryFilter
    search_fields = ['name', 'description']

    # def get_queryset(self):
    #     try:
    #         custom_order = [
    #             'Mercedes-Benz',
    #             'BMW',
    #             'Audi',
    #             'Land Rover',
    #             'Toyota'
    #         ]
    #
    #         brand_order_case = Case(
    #             *[
    #                 When(brand__name=brand, then=Value(index))
    #                 for index, brand in enumerate(custom_order)
    #             ],
    #             default=Value(len(custom_order)),
    #             output_field=IntegerField()
    #         )
    #
    #         return (
    #             Inventory.objects
    #             .filter(status=BaseModel.StatusChoices.PUBLISHED)
    #             .annotate(brand_priority=brand_order_case)
    #             .order_by('brand_priority', '-created_at')  # then by latest
    #         )
    #     except Exception as e:
    #         from django.http import Http404
    #         raise Http404(f"Inventory query failed due to: {str(e)}")

    def get_queryset(self):
        return (
            Inventory.objects.filter(status=BaseModel.StatusChoices.PUBLISHED)
            .order_by(OrderBy(F("price"), nulls_first=True, descending=True))  # Null first, then ascending
        )


class InventoryDetailView(generics.RetrieveAPIView):
    permission_classes = []
    serializer_class = InventoryDetailSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Inventory.objects.filter(status=BaseModel.StatusChoices.PUBLISHED).order_by('-created_at')


class BrandListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = BrandListSerializer
    queryset = Brand.objects.filter(status=BaseModel.StatusChoices.PUBLISHED).order_by('name')
    pagination_class = None


class ModelGenerationListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = ModelGenerationListSerializer
    queryset = ModelGeneration.objects.filter(status=BaseModel.StatusChoices.PUBLISHED).order_by('model')
    pagination_class = None


class BodyStyleListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = BodyStyleListSerializer
    queryset = BodyStyle.objects.filter(status=BaseModel.StatusChoices.PUBLISHED).order_by('body')
    pagination_class = None


class InventoryFeaturedListView(generics.ListAPIView):
    serializer_class = InventoryListSerializer
    pagination_class = None

    def get_queryset(self):
        return Inventory.objects.filter(
            is_featured=True,
            status=BaseModel.StatusChoices.PUBLISHED
        ).order_by('-created_at')[:10]


class InventoryRelatedBrandListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = InventoryListSerializer

    def get_queryset(self):
        inventory_id = self.kwargs.get('id')
        try:
            inventory = Inventory.objects.get(id=inventory_id)
        except Inventory.DoesNotExist:
            return Inventory.objects.none()

        return Inventory.objects.filter(
            brand=inventory.brand,
            status=BaseModel.StatusChoices.PUBLISHED
        ).exclude(id=inventory.id).order_by('-created_at')


class StockListView(generics.ListAPIView):
    permission_classes = []
    serializer_class = StockListSerializer
    queryset = Stock.objects.filter(status=BaseModel.StatusChoices.PUBLISHED).order_by('-created_at')[:20]
    pagination_class = None


class InventoryQuoteCreateAPI(generics.CreateAPIView):
    permission_classes = []
    serializer_class = InventoryQuoteCreateSerializer
    queryset = InventoryQuote.objects.all()
