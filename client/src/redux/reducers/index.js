import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import partnerBookingReducer from "./partnerBookingReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  booking: partnerBookingReducer
});
