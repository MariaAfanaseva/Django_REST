from rest_framework import serializers
from .models import Message


class AddMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('name', 'email', 'phone', 'cause', 'message')

    def create(self, validated_data):
        return Message.objects.create(**validated_data)
