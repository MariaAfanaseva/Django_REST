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
            raise serializers.ValidationError({'error': 'An email and a password are required in login.'})

        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            user = None

        if user:
            if not user.check_password(password):
                raise serializers.ValidationError({'error': 'Incorrect password please try again.'})
        else:
            raise serializers.ValidationError({'error': f'User with email {email} does not exist.'})

        attrs['user'] = user
        return attrs


class UserRegisterSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'password', 'password_confirm',)

    def validate(self, attrs):
        email = attrs.get('email', None)
        password = attrs.get('password', None)
        password_confirm = attrs.pop('password_confirm')

        if not email or not password:
            raise serializers.ValidationError('An email, a password and a confirm password '
                                              'are required in registration.')
        if password != password_confirm:
            raise serializers.ValidationError('Passwords do not match')

        return attrs

    def create(self, validated_date):
        user_madel = get_user_model()
        user = user_madel.objects.create_user(first_name=validated_date['first_name'], last_name=validated_date['last_name'],
                                              email=validated_date['email'], password=validated_date['password'])
        return user
