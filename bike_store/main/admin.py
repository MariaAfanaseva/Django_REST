from django.contrib import admin
from main.models import Bike


@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'description']
    list_filter = ['name']
