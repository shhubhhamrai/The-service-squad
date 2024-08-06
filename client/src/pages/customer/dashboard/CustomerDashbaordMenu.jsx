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
      <Link className="nav-link" to="/dashboard/customer/home">
        Home
      </Link>
      <Link className="nav-link" to="/customer/profile">
        Update Profile
      </Link>
      <Link className="nav-link" to="/dashboard/customer/bookings">
        Bookings
      </Link>
    </div>
  );
}

export default DashboardMenu;
