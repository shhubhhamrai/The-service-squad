import { SET_BOOKING_PARTNER_DETAIL } from "../actions/types";

const initialState = {
  data: false,
  partnerName: "",
  partnerId: "",
  phoneNumbre: ""
};

const partnerBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_PARTNER_DETAIL:
      return {
        ...state,
        data: true,
        partnerId: action.payload.partnerId,
        partnerName: action.payload.partnerName,
        phoneNumbre: action.payload.phoneNumbre
      };
    default:
      return state;
  }
};

export default partnerBookingReducer;
