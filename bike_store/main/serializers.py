from rest_framework import serializers
from .models import Bike
from .models import BikeDetail


class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = ('id', 'name', 'image', 'price')


class BikeDetailSerializer(serializers.ModelSerializer):
    bike = BikeSerializer(read_only=True)

    class Meta:
        model = BikeDetail
        fields = ('bike', 'description')
