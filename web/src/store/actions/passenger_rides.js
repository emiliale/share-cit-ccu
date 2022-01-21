import axios from "axios";
import { requestData, finishRequest } from "./requests";

export const RECEIVE_PASSENGER_RIDES = "RECEIVE_PASSENGER_RIDES";
export const ADD_PASSENGER_RIDE = "ADD_PASSENGER_RIDE";
export const EDIT_PASSENGER_RIDE = "EDIT_PASSENGER_RIDE";
export const REMOVE_PASSENGER_RIDE = "REMOVE_PASSENGER_RIDE";

const serverUrl = "http://127.0.0.1:8000";


export function receivePassenger_rides(data) {
  return {
    type: RECEIVE_PASSENGER_RIDES,
    passenger_rides: data,
  };
}

export function addPassenger_ride(data) {
  return {
    type: ADD_PASSENGER_RIDE,
    passenger_ride: data,
  };
}

function editPassenger_ride(data) {
  return {
    type: EDIT_PASSENGER_RIDE,
    passenger_ride: data,
  };
}

function removePassenger_ride(id) {
  return {
    type: REMOVE_PASSENGER_RIDE,
    passenger_rideId: id,
  };
}

export function getPassenger_rides(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/passenger_ride/passenger_rides/`).then((res) => {
      if (res.status !== "error") dispatch(receivePassenger_rides(res.data));
      dispatch(finishRequest());
    });
  };
}

export function newPassenger_ride(driver, status, rate) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/passenger_ride/passenger_rides/`, {
        driver: driver,
        status: status,
        rate: rate,
      })
      .then((res) => {
        dispatch(addPassenger_ride(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updatePassenger_ride(passenger_rideId, driver, status, rate) {
  return (dispatch) => {
    axios
      .put(`${serverUrl}/passenger_ride/passenger_rides/` + passenger_rideId + "/", {
        driver: driver,
        status: status,
        rate: rate,
      })
      .then((res) => {
        dispatch(editPassenger_ride(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deletePassenger_ride(passenger_rideId) {
  return (dispatch) => {
    axios
      .delete(`${serverUrl}/passenger_ride/passenger_rides/` + passenger_rideId + "/")
      .then((res) => {
        dispatch(removePassenger_ride(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
