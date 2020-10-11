from rest_framework import views
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .serializers import BikeSerializer, BikeDetailSerializer
from .models import Bike
from .models import BikeDetail


class BikeView(views.APIView):

    def get(self, request):
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True, read_only=True)
        return Response(serializer.data)

    @method_decorator(cache_page(60))
    def dispatch(self, request, *args, **kwargs):
        return super(BikeView, self).dispatch(request, *args, **kwargs)


class BikeDetails(views.APIView):

    def get(self, request, pk):
        bike_detail = BikeDetail.objects.get(bike__id=pk)
        serializer = BikeDetailSerializer(bike_detail)
        return Response(serializer.data)

    @method_decorator(cache_page(60))
    def dispatch(self, request, *args, **kwargs):
        return super(BikeDetails, self).dispatch(request, *args, **kwargs)
