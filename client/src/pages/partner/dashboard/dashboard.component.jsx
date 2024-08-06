import React from "react";
import { Route } from "react-router-dom";
import PartnerDashboardMenu from "./DashboardMenu";
import PartnerHome from "./PartnerHome";
import PartNerBookings from "./PartnerBookings";

function PartnerDashboard() {
  return (
    <div className="container app-background m-5">
      <h3>Dashboard</h3>
      <div className="row">
        <div className="col-md-3">
          <PartnerDashboardMenu />
        </div>
        <div className="col-md-9">
          <Route path="/dashboard/partner/home" component={PartnerHome} />
          <Route
            path="/dashboard/partner/bookings"
            component={PartNerBookings}
          />
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;
