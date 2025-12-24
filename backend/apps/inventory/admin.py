from django.contrib import admin
from apps.inventory.models import (
    Brand, ModelGeneration, BodyStyle, Inventory, InventoryImage, Stock, InventoryQuote
)


class InventoryImageInline(admin.TabularInline):
    model = InventoryImage
    extra = 1


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'car_type', 'brand', 'model', 'fuel_type', 'transmission', 'year', 'condition', 'registered',
        'slightly_negotiable', 'status'
    ]
    list_filter = [
        'car_type', 'brand', 'model', 'fuel_type', 'transmission', 'year', 'condition', 'registered', 'status'
    ]
    search_fields = ['name', 'description']
    inlines = [InventoryImageInline]

# @admin.register(InventoryImage)
# class InventoryImageAdmin(admin.ModelAdmin):
#     list_display = ['inventory', 'caption', 'image']
#     search_fields = ['caption']


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'image', 'status']
    search_fields = ['name']


@admin.register(ModelGeneration)
class ModelGenerationAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'status']


@admin.register(BodyStyle)
class BodyStyleAdmin(admin.ModelAdmin):
    list_display = ['body', 'status']


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'created_at']
    ordering = ('-created_at',)


@admin.register(InventoryQuote)
class InventoryQuoteAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'car', 'created_at']
    ordering = ('-created_at',)
