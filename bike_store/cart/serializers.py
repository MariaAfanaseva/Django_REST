from rest_framework import serializers
from .models import Cart


class CartSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ('id', 'name', 'image', 'price', 'quantity')

    def get_id(self, obj):
        return obj.bike.pk

    def get_name(self, obj):
        return obj.bike.name

    def get_image(self, obj):
        return obj.bike.image

    def get_price(self, obj):
        return obj.bike.price


class UpdateCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('quantity',)

    def validate_quantity(self, value):
        if not value:
            raise serializers.ValidationError('Quantity must be greater than zero.')
        return value
