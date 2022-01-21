import axios from "axios";
import { requestData, finishRequest } from "./requests";

export const RECEIVE_DRIVER_RIDES = "RECEIVE_DRIVER_RIDES";
export const ADD_DRIVER_RIDE = "ADD_DRIVER_RIDE";
export const EDIT_DRIVER_RIDE = "EDIT_DRIVER_RIDE";
export const REMOVE_DRIVER_RIDE = "REMOVE_DRIVER_RIDE";

const serverUrl = "http://127.0.0.1:8000";


export function receiveDriver_rides(data) {
    return {
        type: RECEIVE_DRIVER_RIDES,
        driver_rides: data,
    };
}

export function addDriver_ride(data) {
    return {
        type: ADD_DRIVER_RIDE,
        driver_ride: data,
    };
}

function editDriver_ride(data) {
    return {
        type: EDIT_DRIVER_RIDE,
        driver_ride: data,
    };
}

function removeDriver_ride(id) {
    return {
        type: REMOVE_DRIVER_RIDE,
        driver_rideId: id,
    };
}

export function getDriver_rides(level) {
    return (dispatch) => {
        dispatch(requestData(level));
        axios.get(`${serverUrl}/driver_ride/driver_rides/`).then((res) => {
            if (res.status !== "error") dispatch(receiveDriver_rides(res.data));
            dispatch(finishRequest());
        });
    };
}

export function newDriver_ride(start_location, end_location, date, start_time, arrival_time, number_of_passengers, driver, status, car, rate, price) {
    return (dispatch) => {
        axios
            .post(`${serverUrl}/driver_ride/driver_rides/`, {
                start_location: start_location,
                end_location: end_location,
                date: date,
                start_time: start_time,
                arrival_time: arrival_time,
                number_of_passengers: number_of_passengers,
                driver: driver,
                status: status,
                car: car,
                rate: rate,
                price: price,
            })
            .then((res) => {
                dispatch(addDriver_ride(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function updateDriver_ride(driver_rideId, start_location, end_location, date, start_time, arrival_time, number_of_passengers, driver, status, car, rate, price) {
    return (dispatch) => {
        axios
            .put(`${serverUrl}/driver_ride/driver_rides/` + driver_rideId + "/", {
                start_location: start_location,
                end_location: end_location,
                date: date,
                start_time: start_time,
                arrival_time: arrival_time,
                number_of_passengers: number_of_passengers,
                driver: driver,
                status: status,
                car: car,
                rate: rate,
                price: price,
            })
            .then((res) => {
                dispatch(editDriver_ride(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function deleteDriver_ride(driver_rideId) {
    return (dispatch) => {
        axios
            .delete(`${serverUrl}/driver_ride/driver_rides/` + driver_rideId + "/")
            .then((res) => {
                dispatch(removeDriver_ride(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
