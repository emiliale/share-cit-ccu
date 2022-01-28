from django.db import models
from django.contrib.auth.models import User

from location.models import Location


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    ID_number = models.CharField(max_length=255, unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    chat_preferences = models.CharField(max_length=255, null=True, blank=True)
    pet_preferences = models.CharField(max_length=255, null=True, blank=True)
    smoking_preferences = models.CharField(max_length=255, null=True, blank=True)
    time_preferences = models.CharField(max_length=255, null=True, blank=True)
    location = models.ForeignKey(Location, related_name="profile_location", on_delete=models.SET_NULL, null=True, blank=True)
    passenger_rate = models.FloatField(null=True, blank=True)
    driver_rate = models.FloatField(null=True, blank=True)
    picture = models.TextField(null=True, blank=True)
