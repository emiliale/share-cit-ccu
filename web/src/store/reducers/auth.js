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

const reducer = combineReducers({
  auth: authReducer,
  request: requestsReducer,
  users: usersReducer,
});

export default reducer;
