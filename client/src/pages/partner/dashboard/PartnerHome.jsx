import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Animation from "../../../components/Animation";

function PartnerHome() {
  const [partnerDetails, setPartnerDetails] = useState({});

  const loggedInUser = useSelector(state => state.auth);

  if (!loggedInUser.isAuthenticated) {
    window.location.replace("/login");
  }

  console.log(loggedInUser);

  const partnerId = loggedInUser.user.id;

  useEffect(() => {
    axios
      .get("/api/partner/partner/" + partnerId)
      .then(result => {
        setPartnerDetails(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {partnerDetails ? (
        <div>
          <h4> {loggedInUser.user.name} </h4>
          <div>
            <span>Jobs Complited : </span>
            <span>{partnerDetails.jobsCompleted}</span>
          </div>

          <div>
            <span>Phone Number : </span>
            <span>{partnerDetails.phoneNumber}</span>
          </div>
          <div>
            {partnerDetails.currentLocation ? (
              <span>
                <span>Cities available in :</span>
                {partnerDetails.currentLocation.map((city, index) => {
                  return <span key={index}> {city} </span>;
                })}
              </span>
            ) : null}
          </div>
          <div>
            {partnerDetails.currentLocation ? (
              <span>
                <span>Services :</span>
                {partnerDetails.services.map((serve, index) => {
                  return <span key={index}> {serve} </span>;
                })}
              </span>
            ) : null}
          </div>
          <div>
            {partnerDetails.currentLocation ? (
              <span>
                <span>Rates :</span>
                {partnerDetails.ratePerHour.map((rates, index) => {
                  return <span key={index}> {rates}₹ </span>;
                })}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <Animation />
      )}
    </>
  );
}

export default PartnerHome;
