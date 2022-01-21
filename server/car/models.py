from django.db import models

from administration.models import UserProfile


class Car(models.Model):
    registration_number = models.CharField(primary_key=True, unique=True, max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=True)
    bodywork_type = models.CharField(max_length=255, null=True, blank=True)
    color = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(UserProfile, related_name="car_profile", on_delete=models.SET_NULL, null=True, blank=True)
