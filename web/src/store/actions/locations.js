import axios from "axios";
import { requestData, finishRequest } from "./requests";

export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";
export const ADD_LOCATION = "ADD_LOCATION";
export const EDIT_LOCATION = "EDIT_LOCATION";
export const REMOVE_LOCATION = "REMOVE_LOCATION";

const serverUrl = "http://127.0.0.1:8000";


export function receiveLocations(data) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: data,
  };
}

export function addLocation(data) {
  return {
    type: ADD_LOCATION,
    location: data,
  };
}

function editLocation(data) {
  return {
    type: EDIT_LOCATION,
    location: data,
  };
}

function removeLocation(id) {
  return {
    type: REMOVE_LOCATION,
    locationId: id,
  };
}

export function getLocations(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/location/locations/`).then((res) => {
      if (res.status !== "error") dispatch(receiveLocations(res.data));
      dispatch(finishRequest());
    });
  };
}

export function newLocation(street, building_number, flat_number, district, zip_code, city) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/location/locations/`, {
        street: street,
        building_number: building_number,
        flat_number: flat_number,
        district: district,
        zip_code: zip_code,
        city: city,
      })
      .then((res) => {
        dispatch(addLocation(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateLocation(locationId, street, building_number, flat_number, district, zip_code, city) {
  return (dispatch) => {
    axios
      .put(`${serverUrl}/location/locations/` + locationId + "/", {
        street: street,
        building_number: building_number,
        flat_number: flat_number,
        district: district,
        zip_code: zip_code,
        city: city,
      })
      .then((res) => {
        dispatch(editLocation(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteLocation(locationId) {
  return (dispatch) => {
    axios
      .delete(`${serverUrl}/location/locations/` + locationId + "/")
      .then((res) => {
        dispatch(removeLocation(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
