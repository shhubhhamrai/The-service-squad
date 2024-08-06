import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

function PartnerBookings() {
  const [myBookings, setMyBookings] = useState();
  const loggedInUser = useSelector(state => state.auth);

  if (!loggedInUser.isAuthenticated) {
    window.location.replace("/login");
  }

  useEffect(() => {
    axios
      .get("/api/booking/partner-bookings/" + loggedInUser.user.id + "")
      .then(result => {
        setMyBookings(result.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      {myBookings ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">For</th>
            </tr>
          </thead>
          <tbody>
            {console.log(myBookings)}
            {myBookings.map((booking, index) => {
              return (
                <tr key={booking.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{booking.phoneNumber}</td>
                  <td>
                    {booking.address} {booking.zipCode}
                  </td>
                  <td>
                    {moment(booking.selectedForDateFrom).format("DD MMM YYYY")}
                  </td>
                  <td>
                    {moment(booking.selectedForDateTo).format("DD MMM YYYY")}
                  </td>
                  <td>{booking.bookedForService}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default PartnerBookings;
