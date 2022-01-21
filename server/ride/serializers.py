from rest_framework import serializers
from ride.models import DriverRide, PassengerRide


class DriverRideSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverRide
        fields = "__all__"


class PassengerRideSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverRide
        fields = "__all__"
