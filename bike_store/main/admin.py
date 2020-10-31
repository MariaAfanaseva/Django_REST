from django.contrib import admin
from main.models import Bike, BikeDetail


@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'image']
    list_filter = ['name']


@admin.register(BikeDetail)
class BikeDetailAdmin(admin.ModelAdmin):
    list_display = ['description']
    list_filter = ['bike__name']
