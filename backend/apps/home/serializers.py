import bleach
from rest_framework import serializers

from core.mixins.image_optimization_mixins import OptimizedImageSerializerMixin

from apps.home.models import (
    Slider, SocialMedia, SellCar, PeopleTalkAboutUs, SellYourCarImages, Subscriber, SalesRepresentative
)


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['heading', 'image']


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['facebook', 'instagram', 'twitter', 'youtube']


class SellYourCarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellYourCarImages
        fields = '__all__'


class SellCarSerializer(serializers.ModelSerializer):

    class Meta:
        model = SellCar
        fields = '__all__'

    def validate_name(self, value):
        # Sanitize to prevent XSS
        return bleach.clean(value, tags=[], strip=True)


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

    def validate_name(self, value):
        # Sanitize to prevent XSS
        return bleach.clean(value, tags=[], strip=True)


class PeopleTalkAboutUsSerializer(serializers.ModelSerializer, OptimizedImageSerializerMixin):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PeopleTalkAboutUs
        fields = [
            'title', 'image', 'url', 'is_featured'
        ]

    def get_image(self, obj):
        return self.get_optimized_image_url(obj, 'image')


class SalesRepresentativeListSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesRepresentative
        fields = [
            'phone_number'
        ]
