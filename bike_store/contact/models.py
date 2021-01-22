from django.db import models
from django.core.validators import RegexValidator


class Message(models.Model):
    name = models.CharField(max_length=128, verbose_name='Customer name',
                            blank=False, null=False)
    email = models.EmailField(max_length=255, verbose_name='Customer email',
                              blank=False, null=False)
    phone = models.CharField(max_length=30, verbose_name='Customer phone',
                             blank=False, null=False,
                             validators=[
                                 RegexValidator(
                                     regex=r'^\+?1?\d{9,15}$',
                                     message="Phone number must be entered in the format "
                                             "'+123456789'. Up to 15 digits allowed."
                                 ),
                             ],
                             )
    cause = models.CharField(max_length=128, verbose_name='Message cause',
                             blank=False, null=False)
    message = models.TextField(max_length=288, verbose_name='Message',
                               blank=False, null=False)

    def __str__(self):
        return self.email
