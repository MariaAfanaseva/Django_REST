from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(
        max_length=128,
        write_only=True
    )

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', )

    def validate(self, attrs):
        email = attrs.get('email', None)
        password = attrs.get('password', None)
        if not email or not password:
            raise serializers.ValidationError('An email and a password are required in login.')

        user = get_user_model().objects.get(email=email)

        if user:
            if not user.check_password(password):
                raise serializers.ValidationError('Incorrect credentials please try again.')

        attrs['user'] = user
        return attrs
