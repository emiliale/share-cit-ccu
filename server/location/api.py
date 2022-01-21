from location.models import Location
from location.serializers import LocationSerializer
from utils.api_utils import setSerializer


class App:
    locations = setSerializer(Location, LocationSerializer)
