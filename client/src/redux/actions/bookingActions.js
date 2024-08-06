import { SET_BOOKING_PARTNER_DETAIL } from "./types";
import axios from "axios";

// export const bookPartner = partnerData => dispatch => {
//   console.log(partnerData);
// };

export const bookPartner = partnerDetail => {
  return {
    type: SET_BOOKING_PARTNER_DETAIL,
    payload: partnerDetail
  };
};
