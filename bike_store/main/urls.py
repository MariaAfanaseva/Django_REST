from django.urls import path

from .views import BikeView, BikeDetails

urlpatterns = [
    path('bikes/', BikeView.as_view()),
    path('bike_detail/<int:pk>/', BikeDetails.as_view()),
]
