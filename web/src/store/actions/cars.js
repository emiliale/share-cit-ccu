import axios from "axios";
import { requestData, finishRequest } from "./requests";

export const RECEIVE_CARS = "RECEIVE_CARS";
export const ADD_CAR = "ADD_CAR";
export const EDIT_CAR = "EDIT_CAR";
export const REMOVE_CAR = "REMOVE_CAR";

const serverUrl = "http://127.0.0.1:8000";


export function receiveCars(data) {
  return {
    type: RECEIVE_CARS,
    cars: data,
  };
}

export function addCar(data) {
  return {
    type: ADD_CAR,
    car: data,
  };
}

function editCar(data) {
  return {
    type: EDIT_CAR,
    car: data,
  };
}

function removeCar(id) {
  return {
    type: REMOVE_CAR,
    carId: id,
  };
}

export function getCars(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/car/cars/`).then((res) => {
      if (res.status !== "error") dispatch(receiveCars(res.data));
      dispatch(finishRequest());
    });
  };
}

export function newCar(registration_number, brand, bodywork_type, color, user) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/car/cars/`, {
        registration_number: registration_number,
        brand: brand,
        bodywork_type: bodywork_type,
        color: color,
        user: user,
      })
      .then((res) => {
        dispatch(addCar(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateCar(registration_number, brand, bodywork_type, color, user) {
  return (dispatch) => {
    axios
      .put(`${serverUrl}/car/cars/` + registration_number + "/", {
        brand: brand,
        bodywork_type: bodywork_type,
        color: color,
        user: user,
      })
      .then((res) => {
        dispatch(editCar(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteCar(carId) {
  return (dispatch) => {
    axios
      .delete(`${serverUrl}/car/cars/` + carId + "/")
      .then((res) => {
        dispatch(removeCar(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
