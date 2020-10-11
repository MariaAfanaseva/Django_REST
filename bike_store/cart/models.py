from django.db import models
from django.contrib.auth.models import User
from main.models import Bike


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             blank=False, null=False)
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name='cart')
    quantity = models.PositiveIntegerField(default=1, blank=False, null=False)

