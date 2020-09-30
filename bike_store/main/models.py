from django.db import models


class Bike(models.Model):
    name = models.CharField(max_length=128, verbose_name='Bike name',
                            blank=False, null=False)
    price = models.DecimalField(max_length=255, verbose_name='Bike price',
                                default=0, max_digits=8, decimal_places=2)
    description = models.TextField(verbose_name='Bike description', blank=True, null=True)
