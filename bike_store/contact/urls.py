from django.urls import path
from .views import AddMessageView

urlpatterns = [
    path('add/', AddMessageView.as_view()),
]
