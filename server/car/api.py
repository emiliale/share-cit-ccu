from car.models import Car
from car.serializers import CarSerializer
from utils.api_utils import setSerializer


class App:
    cars = setSerializer(Car, CarSerializer)
