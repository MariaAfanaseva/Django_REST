from rest_framework import viewsets
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


from .serializers import BikeSerializer
from .models import Bike


class BikeViewSet(viewsets.ModelViewSet):
    serializer_class = BikeSerializer

    def get_queryset(self):
        return Bike.objects.all()

    @method_decorator(cache_page(60))
    def dispatch(self, request, *args, **kwargs):
        return super(BikeViewSet, self).dispatch(request, *args, **kwargs)
