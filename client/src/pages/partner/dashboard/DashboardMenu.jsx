import React from "react";
import { Link } from "react-router-dom";

function DashboardMenu() {
  return (
    <div
      className="nav flex-column nav-pills"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      <Link className="nav-link" to="/dashboard/partner/home">
        Home
      </Link>
      <Link className="nav-link" to="/partner/profile">
        Update Profile
      </Link>
      <Link className="nav-link" to="/dashboard/partner/bookings">
        Bookings
      </Link>
    </div>
  );
}

export default DashboardMenu;
