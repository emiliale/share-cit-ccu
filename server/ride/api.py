from ride.models import DriverRide, PassengerRide
from ride.serializers import DriverRideSerializer, PassengerRideSerializer
from utils.api_utils import setSerializer


class App:
    driver_rides = setSerializer(DriverRide, DriverRideSerializer)
    passenger_rides = setSerializer(PassengerRide, PassengerRideSerializer)
