from django.urls import path
from . import views

urlpatterns = [
    path("scan/", views.scan_food_image, name="scan_food_image"),
    path("prepare/", views.prepare_ai, name="prepare_ai"),
    path("ask/", views.guide_ai, name="guide_ai"),
]
