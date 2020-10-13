from django.urls import path

from .views import BikeView, BikeDetails

urlpatterns = [
    path('bikes/', BikeView.as_view()),
    path('bike_details/<int:pk>/', BikeDetails.as_view()),
]
