from django.contrib.auth.models import User
from administration.serializers import UserSerializer
from utils.api_utils import setSerializer

from administration.models import UserProfile
from administration.serializers import UserProfileSerializer


class App:
    users = setSerializer(User, UserSerializer)
    user_profiles = setSerializer(UserProfile, UserProfileSerializer)
