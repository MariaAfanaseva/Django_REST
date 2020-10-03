from rest_framework import viewsets
from .serializers import CartSerializers
from .models import Cart


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializers
    queryset = Cart.objects.all()
