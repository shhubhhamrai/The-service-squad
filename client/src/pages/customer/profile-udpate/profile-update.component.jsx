import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../../assests/Sign-up-bg.png";
import classnames from "classnames";
import FormInput from "../../../components/form-input/form-input.component";
import CustomButton from "../../../components/custom-button/custom-button.component";

const CustomerProfileUpdate = props => {
  const [user, setUser] = useState({
    currentCity: "",
    servicePrefrence: "",
    fullAddress: "",
    phoneNumber: "",
    errors: {}
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get("/api/customer/customer-profile-data")
      .then(result => {
        const {
          currentCity,
          servicePrefrence,
          fullAddress,
          phoneNumber
        } = result.data;

        setUser({
          ...user,
          currentCity,
          servicePrefrence,
          fullAddress,
          phoneNumber
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    let updateProfile = {
      currentCity: user.currentCity,
      servicePrefrence: user.servicePrefrence,
      fullAddress: user.fullAddress,
      phoneNumber: user.phoneNumber
    };
    axios
      .post("/api/customer/update-customer", updateProfile)
      .then(res => {
        setUser({ ...user, errors: {} });
        window.location.replace("/dashboard/customer/home");
      })
      .catch(err => {
        setUser({ ...user, errors: err.response.data });
      });
    // setUser({
    //     ...user, currentCity: "", servicePrefrence: "", fullAddress: "", phoneNumber: "",
    //     name: "", errors: {}
    // });
    // console.log(props);
    // props.history.push("/customer/dashboard");
    // /customer/dashboard
  };
  return (
    <div className="sign-up-parent">
      <div className="sign-up-image">
        <h1>Welcome :)</h1>
        <img src={Background} alt="login-background" />
      </div>
      <div className="sign-up">
        <h2 className="title">Update your profile!</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* <div className="required-field">* required field</div> */}
          <FormInput
            handleChange={handleChange}
            name="currentCity"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.currentCity
            })}
            type="text"
            value={user.currentCity}
            label="Current City*"
          />
          {user.errors.currentCity && (
            <div className="isError"> {user.errors.currentCity} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="servicePrefrence"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.servicePrefrence
            })}
            type="text"
            value={user.servicePrefrence}
            label="Service Prefrence*"
          />
          {user.errors.servicePrefrence && (
            <div className="isError"> {user.errors.servicePrefrence} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="fullAddress"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.fullAddress
            })}
            type="text"
            value={user.fullAddress}
            label="Full Address*"
          />
          {user.errors.fullAddress && (
            <div className="isError"> {user.errors.fullAddress} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="phoneNumber"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.phoneNumber
            })}
            type="text"
            value={user.phoneNumber}
            label="Phone Number*"
          />
          {user.errors.phoneNumber && (
            <div className="isError"> {user.errors.phoneNumber} </div>
          )}

          <div className="buttons">
            <CustomButton type="submit">Submit</CustomButton>
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

export default CustomerProfileUpdate;
