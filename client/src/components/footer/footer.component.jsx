import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

import "./footer.styles.scss";
import logo from "../../assests/S-logo.jpg";

const Footer = () => {
  const [subscribe, setSubscriber] = useState({
    email: "",
    errors: {}
  });

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setSubscriber({ ...subscribe, [name]: value });
  };
  const onClickHandler = event => {
    const subscriberEmail = {
      email: subscribe.email
    };
    axios
      .post("/api/subscribe", subscriberEmail)
      .then(res => console.log(res.data))
      .catch(err => setSubscriber({ ...subscribe, errors: err.response.data }));
    console.log(subscribe);
  };

  // footer copyright year
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="container-fluid">
      <section className="row">
        <div className="col-5 col-md- col-sm-">
          {/* <img
            style={{ height: "35px" }}
            className="footer-logo"
            src={logo}
            alt="servicium-logo"
          /> */}
                    <h4 style={{fontStyle: "italic"}}>Service Squad</h4>

          <br />
          <br />
          <p style={{ fontSize: "12px" }}>
            Copyright Service Squad {year}. All rights reserved.
          </p>
        </div>
        <div className="col-2 col-md- col-sm-">
          Company
          <ul className="footer-list">
            <li>
              <Link className="footer-nav-link" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-2 col-md- col-sm-">
          Services
          <ul className="footer-list">
            <li>
              <Link className="footer-nav-link" to="/category/Electrical">
                Electrical
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/category/Carpentry">
                Carpentcy
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/category/Plumbing">
                Plumbing
              </Link>
            </li>
            <li>
              <Link className="footer-nav-link" to="/category/Cleaning">
                Home cleaning
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-3 col-md- col-sm-">
          Subscribe
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={subscribe.email}
            className={classnames("subscribe-input form-control", {
              "is-invalid": subscribe.errors.email
            })}
            onChange={onChangeHandler}
          />
          {subscribe.errors.email && (
            <div className="invalid-feedback"> {subscribe.errors.email} </div>
          )}
          <br />
          <button className="subscribe-btn btn" onClick={onClickHandler}>
            Subscribe
          </button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
