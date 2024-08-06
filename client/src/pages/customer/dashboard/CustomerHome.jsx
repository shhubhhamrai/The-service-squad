import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Animation from "../../../components/Animation";

function CustomerHome() {
  const [customerDetail, setCustomerDetail] = useState({});
  const loggedInUser = useSelector(state => state.auth);

  if (!loggedInUser.isAuthenticated) {
    window.location.replace("/login");
  }

  useEffect(() => {
    axios
      .get("/api/customer/customer-profile-data")
      .then(result => {
        setCustomerDetail(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h4> {loggedInUser.user.name} </h4>
      <div>
        <span>Phone Number : </span>
        <span>{customerDetail.phoneNumber}</span>
      </div>
      <div>
        <span>Current Location : </span>
        <span>{customerDetail.currentCity}</span>
      </div>
      <div>
        <span>Full Address : </span>
        <span>{customerDetail.fullAddress}</span>
      </div>
      <div>
        {customerDetail.servicePrefrence ? (
          <span>
            <span>Services Prefrence :</span>
            {customerDetail.servicePrefrence.map((serve, index) => {
              return <span key={index}> {serve} </span>;
            })}
          </span>
        ) : null}
      </div>
      {/* {customerDetail ? (
        <div>
          {customerDetail.currentLocation ? (
            <span>
              <span>Cities available in :</span>
              {customerDetail.currentLocation.map((city, index) => {
                return <span key={index}> {city} </span>;
              })}
            </span>
          ) : null}
        </div>
        <div>
         
          <div>
            {customerDetail.currentLocation ? (
              <span>
                <span>Services :</span>
                {customerDetail.services.map((serve, index) => {
                  return <span key={index}> {serve} </span>;
                })}
              </span>
            ) : null}
          </div>
          <div>
            {customerDetail.currentLocation ? (
              <span>
                <span>Rates :</span>
                {customerDetail.ratePerHour.map((rates, index) => {
                  return <span key={index}> {rates}₹ </span>;
                })}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <Animation />
      )} */}
    </>
  );
}

export default CustomerHome;
