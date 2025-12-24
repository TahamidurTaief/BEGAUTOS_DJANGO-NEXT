from django.urls import path

from apps.home.views import (
    SliderAPIView, SocialMediaAPIView, SellCarCreateAPIView, PeopleTalkListAPIView, SubscriberAPIView,
    SalesRepresentativeListAPI
)

app_name = 'home'


urlpatterns = [
    path('slider/', SliderAPIView.as_view(), name='slider'),
    path('sm/', SocialMediaAPIView.as_view(), name='sm'),
    path('sell-car/', SellCarCreateAPIView.as_view(), name='sell_car'),
    path('subscribers/', SubscriberAPIView.as_view(), name='subscribers'),
    path('people-talk/', PeopleTalkListAPIView.as_view(), name='people_talk'),
    path('sales-representative/', SalesRepresentativeListAPI.as_view(), name='sales_representative'),
]
