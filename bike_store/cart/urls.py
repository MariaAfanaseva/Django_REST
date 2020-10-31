from django.urls import path
from .views import CartView, UpdateCartView

urlpatterns = [
    path('items/', CartView.as_view()),
    path('update/<int:pk>/', UpdateCartView.as_view()),
]
