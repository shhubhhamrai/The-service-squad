import React, { useState, useEffect } from "react";
import profilePic from "../../assests/profile.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assests/S-logo.jpg";
import { logoutUser, getUserCity } from "../../redux/actions/authActions";
import SelectCity from "./SelectCityModal";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "./header.styles.scss";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.auth);
  // if (loggedInUser.isAuthenticated) {
  //   dispatch(getUserCity());
  // }

  const onLogoutUser = event => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (loggedInUser.isAuthenticated) {
      dispatch(getUserCity());
    }
  }, []);

  let userType = "";
  if (loggedInUser.isAuthenticated) {
    if (loggedInUser.user.accountType === "Partner") {
      userType = "partner";
    }
    if (loggedInUser.user.accountType === "Customer") {
      userType = "customer";
    }
  }

  const authLinks = (
    <UncontrolledDropdown inNavbar>
      <DropdownToggle nav>
        <img className="profile-pic" src={profilePic} alt="user-priofile" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <Link
            className="dropdown-color"
            to={"/dashboard/" + userType + "/home"}
          >
            My Profile
          </Link>
        </DropdownItem>
        {/* <DropdownItem>My Orders</DropdownItem>
        <DropdownItem>My Wallet</DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem onClick={onLogoutUser}>Log Out</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  const guestLinks = (
    <div className="option">
      <Link className="option" to="/login">
        Login
      </Link>
      <Link className="option" to="/signup">
        Sign Up
      </Link>
    </div>
  );

  return (
    <div className="header">
      <Navbar color="light" light expand="md">
        <Link to="/">
          <img style={{ height: "35px" }} src={logo} alt="servicium-logo" />
          {/* <h4 style={{fontStyle: "italic"}}>Service Squad</h4> */}
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <SelectCity />
          {/* <Link className="become-partner-link" to="/become-partner">
            <i className="fas fa-users-cog become-partner"></i>
            Become A Partner
          </Link> */}
          {loggedInUser.isAuthenticated ? authLinks : guestLinks}
        </Collapse>
      </Navbar>
      <div className="header-sub-menu">
        <ul>
          <li>
            <Link className="headre-nav-link" to="/category/Electrical">
              Electrical
            </Link>
          </li>
          <li>
            <Link className="headre-nav-link" to="/category/Plumbing">
              Plumbing
            </Link>
          </li>
          <li>
            <Link className="headre-nav-link" to="/category/Painting">
              Painting
            </Link>
          </li>
          <li>
            <Link className="headre-nav-link" to="/category/Cleaning">
              Home cleaning
            </Link>
          </li>
          <li>
            <Link className="headre-nav-link" to="/category/Appliances">
              Appliances
            </Link>
          </li>
          <li>
            <Link className="headre-nav-link" to="/category/Carpentry">
              Carpentry
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
