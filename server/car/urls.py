from django.urls import path, include
from utils.api_utils import get_functionality_paths, get_router
from car.api import App

urlpatterns = [
    path("", include(get_router(App, "car").urls)),
    *get_functionality_paths(App, "car"),
]