from rest_framework import serializers
from .models import Cart
from main.serializers import BikeSerializer


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('id', 'user', 'quantity', 'bike')


class CartDetailSerializer(serializers.ModelSerializer):
    bike = BikeSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'quantity', 'bike')
