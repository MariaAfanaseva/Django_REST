from rest_framework import views
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import (SessionAuthentication,
                                           BasicAuthentication,
                                           TokenAuthentication)
from .serializers import CartSerializer, UpdateCartSerializer
from .models import Cart
from .models import Bike


class CartView(views.APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)


class UpdateCartView(views.APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_cart_product(self, request, pk):
        cart = Cart.objects.filter(user=request.user)
        product = cart.get(bike__pk=pk)
        return product

    def post(self, request, pk):
        serializer = UpdateCartSerializer(data=request.data)
        if serializer.is_valid():
            quantity = serializer.validated_data['quantity']
            product = Bike.objects.get(pk=pk)
            cart = Cart(bike=product, quantity=quantity, user=request.user)
            cart.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        serializer = UpdateCartSerializer(data=request.data)
        if serializer.is_valid():
            quantity = serializer.validated_data['quantity']
            product = self.get_cart_product(request, pk)
            product.quantity += quantity
            product.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk):
        product = self.get_cart_product(request, pk)
        product.delete()
        return Response(status=status.HTTP_200_OK)
