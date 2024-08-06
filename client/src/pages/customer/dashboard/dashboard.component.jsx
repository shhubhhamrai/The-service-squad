import React from "react";
import { Route } from "react-router-dom";
import CustomerDashboardMenu from "./CustomerDashbaordMenu";
import CustomerHome from "./CustomerHome";
import CustomerBookings from "./CustomerBooking";

function CustomerDashboard() {
  return (
    <div className="container app-background m-5">
      <h3>Dashboard</h3>
      <div className="row">
        <div className="col-md-3">
          <CustomerDashboardMenu />
        </div>
        <div className="col-md-9">
          <Route path="/dashboard/customer/home" component={CustomerHome} />
          <Route
            path="/dashboard/customer/bookings"
            component={CustomerBookings}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
