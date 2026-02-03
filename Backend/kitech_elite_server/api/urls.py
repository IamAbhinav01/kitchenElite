from django.urls import path
from . import views

urlpatterns = [
    path("scan/", views.scan_food_image, name="scan_food_image"),
]
