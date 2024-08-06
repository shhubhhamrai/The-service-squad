import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../../assests/Sign-up-bg.png";
import classnames from "classnames";
import FormInput from "../../../components/form-input/form-input.component";
import CustomButton from "../../../components/custom-button/custom-button.component";

const PartnerProfileUpdate = props => {
  const [user, setUser] = useState({
    currentLocation: "",
    services: "",
    ratePerHour: "",
    phoneNumber: "",
    errors: {}
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get("/api/partner/partner-profile-data")
      .then(result => {
        const {
          currentLocation,
          services,
          ratePerHour,
          phoneNumber
        } = result.data;

        setUser({
          ...user,
          currentLocation,
          services,
          ratePerHour,
          phoneNumber
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    let updateProfile = {
      currentLocation: user.currentLocation,
      services: user.services,
      ratePerHour: user.ratePerHour,
      phoneNumber: user.phoneNumber
    };
    axios
      .post("/api/partner/update-partner", updateProfile)
      .then(res => {
        setUser({ ...user, errors: {} });
        window.location.replace("/dashboard/partner/home");
      })
      .catch(err => {
        setUser({ ...user, errors: err.response.data });
      });
    // setUser({
    //     ...user, currentLocation: "", services: "", ratePerHour: "", phoneNumber: "",
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
            name="currentLocation"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.currentLocation
            })}
            type="text"
            value={user.currentLocation}
            label="Enter cities where you provide service*"
          />
          {user.errors.currentLocation && (
            <div className="isError"> {user.errors.currentLocation} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="services"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.services
            })}
            type="text"
            value={user.services}
            label="Enter services you provide*"
          />
          {user.errors.services && (
            <div className="isError"> {user.errors.services} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="ratePerHour"
            className={classnames("form-input", {
              "form-input-invalid": user.errors.ratePerHour
            })}
            type="text"
            value={user.ratePerHour}
            label="Rate per hour*"
          />
          {user.errors.ratePerHour && (
            <div className="isError"> {user.errors.ratePerHour} </div>
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

export default PartnerProfileUpdate;
