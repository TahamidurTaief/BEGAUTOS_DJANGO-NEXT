from rest_framework import serializers

from core.mixins.image_optimization_mixins import OptimizedImageSerializerMixin

from apps.inventory.models import (
    Brand, ModelGeneration, BodyStyle, Inventory, InventoryImage, Stock, InventoryQuote
)


class InventoryImageSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    image = serializers.SerializerMethodField()

    class Meta:
        model = InventoryImage
        fields = ['id', 'caption', 'image']

    def get_image(self, obj):
        return self.get_optimized_image_url(obj, 'image')


class InventoryListSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    feature_image = serializers.SerializerMethodField()
    brand = serializers.StringRelatedField(read_only=True)
    model = serializers.StringRelatedField(read_only=True)
    fuel_type = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Inventory
        fields = [
            'id', 'name', 'car_type', 'brand', 'model', 'year', 'engine_capacity', 'fuel_type',
            'mileage', 'price', 'feature_image', 'body_style', 'registered'
        ]

    def get_feature_image(self, obj):
        if obj.feature_image:
            return self.get_optimized_image_url(obj, 'feature_image')

    def get_fuel_type(self, obj):
        # Custom logic to format fuel_type if it contains "+HYBRID"
        if "+HYBRID" in obj.fuel_type:
            return obj.fuel_type.replace("+HYBRID", " (h)")
        return obj.fuel_type

    def get_price(self, obj):
        if obj.registered == Inventory.AvailabilityChoices.SOLD:
            return "Sold"
        return obj.price


class InventoryDetailSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    feature_image = serializers.SerializerMethodField()
    inventory_images = InventoryImageSerializer(many=True, read_only=True)
    brand = serializers.StringRelatedField(read_only=True)
    model = serializers.StringRelatedField(read_only=True)
    body_style = serializers.StringRelatedField(read_only=True)
    price = serializers.SerializerMethodField()

    class Meta:
        model = Inventory
        fields = [
            'id', 'name', 'car_type', 'brand', 'model', 'year', 'engine_capacity', 'fuel_type', 'mileage', 'price',
            'transmission', 'drive_type', 'wheel_base', 'color', 'condition', 'registered', 'body_style',
            'feature_image', 'description', 'youtube', 'status', 'slightly_negotiable', 'inventory_images'
        ]

    def get_feature_image(self, obj):
        return self.get_optimized_image_url(obj, 'feature_image')

    def get_price(self, obj):
        if obj.registered == Inventory.AvailabilityChoices.SOLD:
            return "Sold"
        return obj.price


class BrandListSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'image']

    def get_image(self, obj):
        return self.get_optimized_image_url(obj, 'image')


class ModelGenerationListSerializer(serializers.ModelSerializer):
    brand = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ModelGeneration
        fields = ['id', 'brand', 'model']


class BodyStyleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyStyle
        fields = ['id', 'body']


class StockListSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        fields = [
            'id',
            'title',
            'image'
        ]

    def get_image(self, obj):
        return self.get_optimized_image_url(obj, 'image')


class InventoryQuoteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventoryQuote
        fields = '__all__'
