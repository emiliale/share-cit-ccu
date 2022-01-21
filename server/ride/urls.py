from django.urls import path, include
from utils.api_utils import get_functionality_paths, get_router
from ride.api import App

urlpatterns = [
    path("", include(get_router(App, "ride").urls)),
    *get_functionality_paths(App, "ride"),
]