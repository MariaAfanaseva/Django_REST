from rest_framework import serializers
from .models import Cart
from main.serializers import BikeSerializer


class CartSerializers(serializers.ModelSerializer):
    bike = BikeSerializer()

    class Meta:
        model = Cart
        fields = ('id', 'quantity', 'bike')
