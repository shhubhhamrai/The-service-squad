import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_CITY } from "./types";

// Register User

export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // save token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // decode jwt token
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      if (decoded.accountType === "Customer") {
        axios
          .get("/api/customer/customer-profile-data")
          .then(result => {
            window.location.replace("/dashboard/customer/home");
          })
          .catch(err => {
            window.location.replace("/customer/profile");
          });
      } else if (decoded.accountType === "Partner") {
        axios
          .get("/api/partner/partner-profile-data")
          .then(result => {
            window.location.replace("/dashboard/partner/home");
          })
          .catch(err => {
            window.location.replace("/partner/profile");
          });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set loggedin user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user

export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // remove auth header for future request
  setAuthToken(false);
  // set current user {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.replace("/login");
};

export const getUserCity = () => dispatch => {
  axios
    .get("/api/users/current-city")
    .then(result => {
      dispatch(setCurrentCity(result.data.currentLocation));
    })
    .catch(err => console.log(err));
};

export const setCurrentCity = currCity => {
  if (Array.isArray(currCity) === false) {
    currCity = [currCity];
  }
  return {
    type: SET_CURRENT_CITY,
    payload: currCity
  };
};
