from django.db import models
from main.models import Bike


class Cart(models.Model):
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name='cart')
    quantity = models.PositiveIntegerField(default=1, blank=False, null=False)

