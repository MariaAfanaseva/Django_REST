from rest_framework import serializers
from .models import Bike
from .models import BikeDetail


class BikeSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()

    class Meta:
        model = Bike
        fields = ('id', 'name', 'image', 'price')


class BikeDetailSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = BikeDetail
        fields = ('id', 'name', 'image', 'price', 'description', )

    def get_id(self, obj):
        return obj.bike.id

    def get_name(self, obj):
        return obj.bike.name

    def get_image(self, obj):
        return obj.bike.image

    def get_price(self, obj):
        return obj.bike.price
