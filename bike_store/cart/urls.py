from rest_framework import routers
from .views import CartViewSet

router = routers.DefaultRouter()
router.register('items', CartViewSet, basename='items')
