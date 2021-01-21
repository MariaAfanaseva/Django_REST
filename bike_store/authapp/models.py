from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set.')

        if not password:
            raise ValueError('The password must be set.')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)  # Default database in settings
        return user

    def create_superuser(self, first_name, last_name, email, password, **extra_fields):
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    username = None
    email = models.EmailField(
        verbose_name='Email address',
        max_length=255,
        unique=True,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
