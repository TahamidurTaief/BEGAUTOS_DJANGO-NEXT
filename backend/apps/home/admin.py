from django.contrib import admin
from apps.home.models import (
    Slider, SocialMedia, SellCar, PeopleTalkAboutUs, SellYourCarImages, Subscriber, SalesRepresentative
)


@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ['heading', 'image']
    search_fields = ['heading']


@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ['facebook', 'instagram', 'twitter', 'youtube']


class SellYourCarImagesAdminInline(admin.StackedInline):
    model = SellYourCarImages
    extra = 0


@admin.register(SellCar)
class SellCarAdmin(admin.ModelAdmin):
    inlines = [SellYourCarImagesAdminInline]
    list_display = ['name', 'phone', 'car_name', 'car_model', 'car_year', 'mileage', 'offered_price']
    search_fields = ['name', 'phone', 'car_name', 'car_model']


@admin.register(PeopleTalkAboutUs)
class PeopleTalkAboutUsAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'is_featured', 'status']


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email']


@admin.register(SalesRepresentative)
class SalesRepresentativeAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone_number', 'status']
    search_fields = ['name', 'phone_number']
    list_filter = ['status']
