import React, { useState } from "react";
import classnames from "classnames";
import axios from "axios";

import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import Background from "../../assests/Sign-up-bg.png";
import { Link } from "react-router-dom";

const SignUp = props => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    name: "",
    errors: {}
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // setUser({
    //   ...user, email: "", password: "", confirmPassword: "", accountType: "",
    //   name: "", errors: {}
    // });
    let newUser = {
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      password: user.password,
      confirmPassword: user.confirmPassword
    };
    axios
      .post("/api/users/register", newUser)
      .then(res => {
        window.location.replace("/login");
      })
      .catch(err => setUser({ ...user, errors: err.response.data }));
    setUser({
      ...user,
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "",
      name: "",
      errors: {}
    });
    // console.log(props);
    // props.history.push("/login");
  };

  return (
    <div className="sign-up-parent">
      <div className="sign-up-image">
        <h1>Hello :)</h1>
        <img src={Background} alt="login-background" />
      </div>
      <div className="sign-up">
        <h2 className="title">Join our community!</h2>
        <span>
          Already have an account?{" "}
          <strong>
            <Link to="/login">Login</Link>
          </strong>
        </span>
        <form onSubmit={handleSubmit} noValidate>
          {/* <div className="required-field">* required field</div> */}
          <FormInput
            handleChange={handleChange}
            name="name"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.name
            })}
            type="text"
            value={user.name}
            label="Name*"
          />
          {user.errors.name && (
            <div className="isError"> {user.errors.name} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="email"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.email
            })}
            type="email"
            value={user.email}
            label="Email*"
          />
          {user.errors.email && (
            <div className="isError"> {user.errors.email} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="password"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.password
            })}
            type="password"
            value={user.password}
            label="Password*"
          />

          {user.errors.password && (
            <div className="isError"> {user.errors.password} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="confirmPassword"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.confirmPassword
            })}
            type="password"
            value={user.confirmPassword}
            label="Confirm Password*"
          />
          {user.errors.confirmPassword && (
            <div className="isError"> {user.errors.confirmPassword} </div>
          )}
          <p className="form-input-radio">Please select Account Type:*</p>
          <div className="radio-button  radio-btn">
            <FormInput
              type="radio"
              name="accountType"
              value="Partner"
              className={classnames("form-input", {
                "form-input-invalid": user.errors.phoneNumber
              })}
              handleChange={handleChange}
              label="Partner"
            />
            <FormInput
              type="radio"
              name="accountType"
              value="Customer"
              className={classnames("form-input", {
                "form-input-invalid": user.errors.phoneNumber
              })}
              handleChange={handleChange}
              label="Customer"
            />
            {user.errors.accountType && (
              <div className="isError"> {user.errors.accountType} </div>
            )}
          </div>

          <div className="buttons">
            <CustomButton type="submit">Sign Up</CustomButton>
          </div>
        </form>
        <span id="terms">
          By joining, you agree to our <strong>Terms</strong> and{" "}
          <strong>Privacy Policy</strong>
        </span>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
