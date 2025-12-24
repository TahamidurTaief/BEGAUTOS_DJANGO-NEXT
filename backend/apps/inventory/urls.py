from django.urls import path

from apps.inventory.views import (
    InventoryListView, InventoryDetailView, BrandListView, ModelGenerationListView, BodyStyleListView,
    InventoryFeaturedListView, InventoryRelatedBrandListView, StockListView, InventoryQuoteCreateAPI
)

app_name = 'inventory'


urlpatterns = [
    path('', InventoryListView.as_view(), name='inventory_list'),
    path('brands/', BrandListView.as_view(), name='brand_list'),
    path('generations/', ModelGenerationListView.as_view(), name='generation_list'),
    path('body-style/', BodyStyleListView.as_view(), name='body_style_list'),
    path('detail/<int:id>/', InventoryDetailView.as_view(), name='inventory_list'),
    path('detail/<int:id>/related/', InventoryRelatedBrandListView.as_view(), name='inventory_related'),
    path('featured/', InventoryFeaturedListView.as_view(), name='inventory_featured_list'),
    path('stocks/', StockListView.as_view(), name='inventory_stocks'),
    path('quote/', InventoryQuoteCreateAPI.as_view(), name='inventory_quote'),
]
