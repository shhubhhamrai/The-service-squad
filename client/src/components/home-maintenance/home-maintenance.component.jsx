import React from "react";
import { Link } from "react-router-dom";

import "./maintenance.style.scss";
import homeCleaningSvg from "../../assests/icons/home-cleaning.svg";
import pestControlSvg from "../../assests/icons/pest-control.svg";
import appliancesSvg from "../../assests/icons/appliances.svg";
import plumbingSvg from "../../assests/icons/plumbing.svg";
import electricalSvg from "../../assests/icons/electrical.svg";
import carpentrySvg from "../../assests/icons/carpentry.svg";
import paintingSvg from "../../assests/icons/painting.svg";

function home_maintenance() {
  return (
    <div className="home-maintenance-wrapper">
      <div className="home-maintenance-heading">Home Maintenace Services</div>
      <div>
        <ul>
          <li>
            <Link to="/category/Cleaning" className="cat-link">
              <img
                className="img-category"
                src={homeCleaningSvg}
                alt="home-cleaning"
              />
              <br />
              <span className="category-text">HOME CLEANING</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Appliances" className="cat-link">
              <img
                className="img-category"
                src={appliancesSvg}
                alt="appliacnes"
              />{" "}
              <br />
              <span className="category-text">APPLIANCES</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Plumbing" className="cat-link">
              <img className="img-category" src={plumbingSvg} alt="plumbing" />{" "}
              <br />
              <span className="category-text">PLUMBING</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Electrical" className="cat-link">
              <img
                className="img-category"
                src={electricalSvg}
                alt="electrical"
              />{" "}
              <br />
              <span className="category-text">ELECTRICAL</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Carpentry" className="cat-link">
              <img
                className="img-category"
                src={carpentrySvg}
                alt="carpentry"
              />{" "}
              <br />
              <span className="category-text">CARPENTRY</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Painting" className="cat-link">
              <img className="img-category" src={paintingSvg} alt="painting" />{" "}
              <br />
              <span className="category-text">PAINTING</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default home_maintenance;
