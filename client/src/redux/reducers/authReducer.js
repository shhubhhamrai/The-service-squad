import isEmpty from "../../validation/is-Empty";
import { SET_CURRENT_USER, SET_CURRENT_CITY } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  currentLocation: "Bangalore"
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_CITY:
      return {
        ...state,
        currentLocation: action.payload[0]
      };
    default:
      return state;
  }
};

export default authReducer;
