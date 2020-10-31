from django.urls import path

from .views import BikeView, BikeDetailsView

urlpatterns = [
    path('bikes/', BikeView.as_view()),
    path('bike_details/<int:pk>/', BikeDetailsView.as_view()),
]
