import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { combineReducers } from "redux";
import {
  REQUEST_DATA,
  REQUEST_CHANGE,
  FINISH_REQUEST,
  DENY_ACCESS,
} from "../actions/requests";
import { RECEIVE_USERS } from "../actions/users";
import {
  RECEIVE_CARS,
  ADD_CAR,
  REMOVE_CAR,
  EDIT_CAR,
} from "../actions/cars";
import {
  RECEIVE_LOCATIONS,
  ADD_LOCATION,
  REMOVE_LOCATION,
  EDIT_LOCATION,
} from "../actions/locations";
import {
  RECEIVE_DRIVER_RIDES,
  ADD_DRIVER_RIDE,
  REMOVE_DRIVER_RIDE,
  EDIT_DRIVER_RIDE,
} from "../actions/driver_rides";
import {
  RECEIVE_PASSENGER_RIDES,
  ADD_PASSENGER_RIDE,
  REMOVE_PASSENGER_RIDE,
  EDIT_PASSENGER_RIDE,
} from "../actions/passenger_rides";
import {
  RECEIVE_USER_PROFILES,
  ADD_USER_PROFILE,
  REMOVE_USER_PROFILE,
  EDIT_USER_PROFILE,
} from "../actions/user_profiles";


const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.username,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
}

function requestsReducer(
  state = { isLocked: false, isLoading: false, hasAccess: true },
  action
) {
  switch (action.type) {
    case REQUEST_DATA:
      return { ...state, isLoading: action.level };
    case REQUEST_CHANGE:
      return { ...state, isLocked: true };
    case FINISH_REQUEST:
      return { ...state, isLocked: false, isLoading: false };
    case DENY_ACCESS:
      return { ...state, hasAccess: false };
    default:
      return state;
  }
}

function usersReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
}

function carsReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_CARS:
      return action.cars;
    case ADD_CAR:
      return [...state, action.car];
    case EDIT_CAR:
      return state.map((car) =>
        car.id === action.car.id ? action.car : car
      );
    case REMOVE_CAR:
      return state.filter((car) => car.id !== action.carId);
    default:
      return state;
  }
}

function locationsReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return action.locations;
    case ADD_LOCATION:
      return [...state, action.location];
    case EDIT_LOCATION:
      return state.map((location) =>
        location.id === action.location.id ? action.location : location
      );
    case REMOVE_LOCATION:
      return state.filter((location) => location.id !== action.locationId);
    default:
      return state;
  }
}

function driver_ridesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_DRIVER_RIDES:
      return action.driver_rides;
    case ADD_DRIVER_RIDE:
      return [...state, action.drive_ride];
    case EDIT_DRIVER_RIDE:
      return state.map((drive_ride) =>
        drive_ride.id === action.drive_ride.id ? action.drive_ride : drive_ride
      );
    case REMOVE_DRIVER_RIDE:
      return state.filter((drive_ride) => drive_ride.id !== action.drive_rideId);
    default:
      return state;
  }
}

function passenger_ridesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_PASSENGER_RIDES:
      return action.passenger_rides;
    case ADD_PASSENGER_RIDE:
      return [...state, action.passenger_ride];
    case EDIT_PASSENGER_RIDE:
      return state.map((passenger_ride) =>
        passenger_ride.id === action.passenger_ride.id ? action.passenger_ride : passenger_ride
      );
    case REMOVE_PASSENGER_RIDE:
      return state.filter((passenger_ride) => passenger_ride.id !== action.passenger_rideId);
    default:
      return state;
  }
}


function user_profilesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_PROFILES:
      return action.user_profiles;
    case ADD_USER_PROFILE:
      return [...state, action.user_profile];
    case EDIT_USER_PROFILE:
      return state.map((user_profile) =>
        user_profile.id === action.user_profile.id ? action.user_profile : user_profile
      );
    case REMOVE_USER_PROFILE:
      return state.filter((user_profile) => user_profile.id !== action.user_profileId);
    default:
      return state;
  }
}


const reducer = combineReducers({
  auth: authReducer,
  request: requestsReducer,
  users: usersReducer,
  cars: carsReducer,
  locations: locationsReducer,
  user_profiles: user_profilesReducer,
  driver_rides: driver_ridesReducer,
  passenger_rides: passenger_ridesReducer,
});

export default reducer;
