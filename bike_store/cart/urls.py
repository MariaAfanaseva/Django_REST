from django.urls import path
from .views import CartView, CartDetails

urlpatterns = [
    path('items/', CartView.as_view()),
    path('details/<int:pk>/', CartDetails.as_view()),
]
