import axios from "axios";
import { requestData, finishRequest } from "./requests";

export const RECEIVE_USER_PROFILES = "RECEIVE_USER_PROFILES";
export const ADD_USER_PROFILE = "ADD_USER_PROFILE";
export const EDIT_USER_PROFILE = "EDIT_USER_PROFILE";
export const REMOVE_USER_PROFILE = "REMOVE_USER_PROFILE";

const serverUrl = "http://127.0.0.1:8000";


export function receiveUser_profiles(data) {
    return {
        type: RECEIVE_USER_PROFILES,
        user_profiles: data,
    };
}

export function addUser_profile(data) {
    return {
        type: ADD_USER_PROFILE,
        user_profile: data,
    };
}

function editUser_profile(data) {
    return {
        type: EDIT_USER_PROFILE,
        user_profile: data,
    };
}

function removeUser_profile(id) {
    return {
        type: REMOVE_USER_PROFILE,
        user_profileId: id,
    };
}

export function getUser_profiles(level) {
    return (dispatch) => {
        dispatch(requestData(level));
        axios.get(`${serverUrl}/user_profile/user_profiles/`).then((res) => {
            if (res.status !== "error") dispatch(receiveUser_profiles(res.data));
            dispatch(finishRequest());
        });
    };
}

export function newUser_profile(user, ID_number, phone_number, age, chat_preferences, pet_preferences, smoking_preferences, time_preferences, location, passenger_rate, driver_rate) {
    return (dispatch) => {
        axios
            .post(`${serverUrl}/user_profile/user_profiles/`, {
                user: user,
                ID_number: ID_number,
                phone_number: phone_number,
                age: age,
                chat_preferences: chat_preferences,
                pet_preferences: pet_preferences,
                smoking_preferences: smoking_preferences,
                time_preferences: time_preferences,
                location: location,
                passenger_rate: passenger_rate,
                driver_rate: driver_rate,
            })
            .then((res) => {
                dispatch(addUser_profile(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function updateUser_profile(user_profileId, user, ID_number, phone_number, age, chat_preferences, pet_preferences, smoking_preferences, time_preferences, location, passenger_rate, driver_rate) {
    return (dispatch) => {
        axios
            .put(`${serverUrl}/user_profile/user_profiles/` + user_profileId + "/", {
                user: user,
                ID_number: ID_number,
                phone_number: phone_number,
                age: age,
                chat_preferences: chat_preferences,
                pet_preferences: pet_preferences,
                smoking_preferences: smoking_preferences,
                time_preferences: time_preferences,
                location: location,
                passenger_rate: passenger_rate,
                driver_rate: driver_rate,
            })
            .then((res) => {
                dispatch(editUser_profile(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function deleteUser_profile(user_profileId) {
    return (dispatch) => {
        axios
            .delete(`${serverUrl}/user_profile/user_profiles/` + user_profileId + "/")
            .then((res) => {
                dispatch(removeUser_profile(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
