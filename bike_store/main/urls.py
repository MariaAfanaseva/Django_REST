from rest_framework import routers

from .views import BikeViewSet

router = routers.DefaultRouter()

router.register('bikes', BikeViewSet, basename='bikes')
