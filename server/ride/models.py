from django.db import models

from location.models import Location
from administration.models import UserProfile
from car.models import Car


class DriverRide(models.Model):

    start_location = models.ForeignKey(Location, related_name="start_location", on_delete=models.SET_NULL, null=True, blank=True)
    end_location = models.ForeignKey(Location, related_name="end_location", on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    arrival_time = models.TimeField(null=True, blank=True)
    number_of_passengers = models.IntegerField(null=True, blank=True)
    driver = models.ForeignKey(UserProfile, related_name="driver_user", on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    car = models.ForeignKey(Car, related_name="driver_car", on_delete=models.SET_NULL, null=True, blank=True)
    rate = models.FloatField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)


class PassengerRide(models.Model):

    driver = models.ForeignKey(DriverRide, related_name="driver_passenger", on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    rate = models.FloatField(null=True, blank=True)


