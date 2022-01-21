from django.db import models


class Location(models.Model):
    street = models.CharField(max_length=255, null=True, blank=True)
    building_number = models.IntegerField(null=True, blank=True)
    flat_number = models.CharField(max_length=255, null=True, blank=True)
    district = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
