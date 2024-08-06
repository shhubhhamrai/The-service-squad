import React from "react";

import "./homepage.styles.scss";
import homePageImg from "../../assests/homePage.jpg";
import MaintenanceServices from "../../components/home-maintenance/home-maintenance.component";

const Homepage = () => (
  <div className="homepage">
    <img
      className="home-page-banner"
      src={homePageImg}
      alt="home-page-banner"
    />
    <section>
      <MaintenanceServices />
    </section>
  </div>
);

export default Homepage;
