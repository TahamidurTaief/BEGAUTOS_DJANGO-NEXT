from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from base.models import BaseModel
from core.mixins.image_validation import ImageValidationMixin

from core.settings.restconf.pagination import PeopleTalkPagination

from apps.home.models import (
    Slider, SocialMedia, SellCar, SellYourCarImages, PeopleTalkAboutUs, Subscriber, SalesRepresentative
)

from apps.home.serializers import (
    SliderSerializer, SocialMediaSerializer, SellYourCarImageSerializer, SellCarSerializer,
    PeopleTalkAboutUsSerializer, SubscriberSerializer, SalesRepresentativeListSearchSerializer
)


class SliderAPIView(APIView):

    def get(self, request, format=None):
        slider_info = Slider.objects.last()
        if slider_info is not None:
            serializer = SliderSerializer(slider_info, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No information available."}, status=status.HTTP_404_NOT_FOUND)


class SocialMediaAPIView(APIView):

    def get(self, request, format=None):
        sm_info = SocialMedia.objects.last()
        if sm_info is not None:
            serializer = SocialMediaSerializer(sm_info, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No information available."}, status=status.HTTP_404_NOT_FOUND)


class SubscriberAPIView(generics.CreateAPIView):
    serializer_class = SubscriberSerializer
    queryset = Subscriber.objects.all()


class SellCarCreateAPIView(ImageValidationMixin, generics.CreateAPIView):
    serializer_class = SellCarSerializer
    queryset = SellCar.objects.all()

    def create(self, request, *args, **kwargs):
        # Use the serializer to validate the base SellCar data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sell_car = serializer.save()

        # Handle multiple images from the "images" field
        images = request.FILES.getlist('images')

        images = request.FILES.getlist('images')
        self.validate_and_save_images(images, sell_car, SellYourCarImages, 'sellcar')

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PeopleTalkListAPIView(generics.ListAPIView):
    serializer_class = PeopleTalkAboutUsSerializer
    pagination_class = PeopleTalkPagination

    def get_queryset(self):
        return PeopleTalkAboutUs.objects.filter(
            status=BaseModel.StatusChoices.PUBLISHED
        ).order_by('-updated_at')


class SalesRepresentativeListAPI(generics.ListAPIView):
    serializer_class = SalesRepresentativeListSearchSerializer
    queryset = SalesRepresentative.objects.filter(status=BaseModel.StatusChoices.PUBLISHED)
    pagination_class = None

