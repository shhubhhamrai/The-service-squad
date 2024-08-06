import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import classnames from "classnames";

function BookingComponent() {
  const [bookingData, setBookingData] = useState({
    available: false,
    bookingUser: "",
    bookedPartner: "",
    address: "",
    bookedForService: "",
    phoneNumber: "",
    selectedForDateFrom: "",
    selectedForDateTo: "",
    addressType: "",
    zipCode: "",
    partnerNumbre: "",
    partnerName: "",
    customerName: "",
    customerEmail: "",
    errors: {}
  });
  const loggedInUser = useSelector(state => state.auth);
  const bookingPartnerData = useSelector(state => state.booking);

  useEffect(() => {
    axios
      .get("/api/customer/customer-profile-data")
      .then(result => {
        setBookingData({
          ...bookingData,
          phoneNumber: result.data.phoneNumber,
          partnerNumbre: bookingPartnerData.phoneNumbre,
          partnerName: bookingPartnerData.partnerName
        });
      })
      .catch(err => console.log(err));
  }, []);

  if (!loggedInUser.isAuthenticated) {
    window.location.replace("/login");
  }
  if (!bookingPartnerData.data) {
    alert("Select partner To Book");
    window.location.replace("/");
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let newBooking = {
      bookingUser: loggedInUser.user.id,
      bookedPartner: bookingPartnerData.partnerId,
      address: bookingData.address,
      bookedForService: bookingData.bookedForService,
      zipCode: bookingData.zipCode,
      phoneNumber: bookingData.phoneNumber,
      selectedForDateFrom: bookingData.selectedForDateFrom,
      selectedForDateTo: bookingData.selectedForDateTo,
      addressType: bookingData.addressType,
      partnerNumbre: bookingPartnerData.phoneNumbre,
      partnerName: bookingPartnerData.partnerName,
      customerEmail: loggedInUser.user.email,
      customerName: loggedInUser.user.name
    };
    axios
      .post("/api/booking/availability", newBooking)
      .then(res => {
        setBookingData({
          bookingData,
          bookingUser: loggedInUser.user.id,
          bookedPartner: bookingPartnerData.partnerId,
          address: bookingData.address,
          bookedForService: bookingData.bookedForService,
          zipCode: bookingData.zipCode,
          phoneNumber: bookingData.phoneNumber,
          selectedForDateFrom: bookingData.selectedForDateFrom,
          selectedForDateTo: bookingData.selectedForDateTo,
          addressType: bookingData.addressType,
          partnerNumbre: bookingPartnerData.phoneNumbre,
          partnerName: bookingPartnerData.partnerName,
          customerName: loggedInUser.user.name,
          customerEmail: loggedInUser.user.email,
          errors: {}
        });
        alert(
          "We shared booking detail with partner he will call u soon for confirmation"
        );
        window.location.replace("/");
      })
      .catch(err =>
        setBookingData({
          bookingData,
          bookingUser: loggedInUser.user.id,
          bookedPartner: bookingPartnerData.partnerId,
          address: bookingData.address,
          bookedForService: bookingData.bookedForService,
          zipCode: bookingData.zipCode,
          phoneNumber: bookingData.phoneNumber,
          selectedForDateFrom: bookingData.selectedForDateFrom,
          selectedForDateTo: bookingData.selectedForDateTo,
          addressType: bookingData.addressType,
          partnerNumbre: bookingPartnerData.phoneNumbre,
          partnerName: bookingPartnerData.partnerName,
          customerEmail: loggedInUser.user.email,
          errors: err.response.data
        })
      );
  };

  return (
    <div className="container m-5">
      <h4>Enter Booking Details </h4>
      <form className="needs-validation">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className={classnames("form-control", {
                "is-invalid": bookingData.errors.address
              })}
              id="validationCustom01"
              value={bookingData.address}
              onChange={handleChange}
            />
            {bookingData.errors.address && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.address}{" "}
              </div>
            )}
          </div>
          <div className="col-md-3 mb-3">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              value={bookingData.phoneNumber}
              type="text"
              className={classnames("form-control", {
                "is-invalid": bookingData.errors.phoneNumber
              })}
              id="validationCustom06"
              onChange={handleChange}
            />
            {bookingData.errors.phoneNumber && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.phoneNumber}{" "}
              </div>
            )}
          </div>
          <div className="col-md-3 mb-3">
            <label>Zip Code</label>
            <input
              name="zipCode"
              value={bookingData.zipCode}
              type="text"
              className={classnames("form-control", {
                "is-invalid": bookingData.errors.zipCode
              })}
              id="validationCustom05"
              onChange={handleChange}
            />
            {bookingData.errors.zipCode && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.zipCode}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom04">Select Service</label>
            <select
              className={classnames("custom-select", {
                "is-invalid": bookingData.errors.bookedForService
              })}
              id="validationCustom04"
              name="bookedForService"
              value={bookingData.bookedForService}
              onChange={handleChange}
              required
            >
              <option selected disabled value="">
                Choose...
              </option>
              <option value="Cleaning">Cleaning</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Painting">Painting</option>
              <option value="Appliances">Appliances</option>
              <option value="Carpentry">Carpentry</option>
            </select>
            {bookingData.errors.bookedForService && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.bookedForService}{" "}
              </div>
            )}
            <div className="invalid-feedback">
              Please select a valid service.
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom07">Address Type</label>
            <select
              className={classnames("custom-select", {
                "is-invalid": bookingData.errors.addressType
              })}
              id="validationCustom07"
              name="addressType"
              value={bookingData.addressType}
              onChange={handleChange}
              required
            >
              <option selected disabled value="">
                Choose...
              </option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
            {bookingData.errors.addressType && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.addressType}{" "}
              </div>
            )}
            <div className="invalid-feedback">
              Please select a valid service.
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <label>Select Date From</label>
            <input
              type="date"
              name="selectedForDateFrom"
              className={classnames("form-control", {
                "is-invalid": bookingData.errors.selectedForDateFrom
              })}
              id="validationCustom02"
              value={bookingData.selectedForDateFrom}
              onChange={handleChange}
            />
            {bookingData.errors.selectedForDateFrom && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.selectedForDateFrom}{" "}
              </div>
            )}
          </div>
          <div className="col-md-3 mb-3">
            <label>Select Date To</label>
            <input
              type="date"
              name="selectedForDateTo"
              className={classnames("form-control", {
                "is-invalid": bookingData.errors.selectedForDateTo
              })}
              id="validationCustom03"
              value={bookingData.selectedForDateTo}
              onChange={handleChange}
            />
            {bookingData.errors.selectedForDateTo && (
              <div className="invalid-feedback">
                {" "}
                {bookingData.errors.selectedForDateTo}{" "}
              </div>
            )}
          </div>
        </div>

        {bookingData.errors.notAvailable ? (
          <>
            {bookingData.errors.notAvailable && (
              <div className="not-available">
                {" "}
                {bookingData.errors.notAvailable}{" "}
              </div>
            )}
          </>
        ) : null}

        {bookingData.errors.internavErr ? (
          <>
            {bookingData.errors.internavErr && (
              <div className="not-available">
                {" "}
                {bookingData.errors.internavErr}{" "}
              </div>
            )}
          </>
        ) : null}

        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}

export default BookingComponent;
