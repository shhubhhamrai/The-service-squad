import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "../../redux/actions/authActions";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Background from "../../assests/login-bg.png";
import { Link } from "react-router-dom";

const SignIn = props => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    errors: {}
  });

  const errorsStore = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { value, name } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const userLogin = {
      email: login.email,
      password: login.password
    };
    dispatch(loginUser(userLogin));
  };

  useEffect(() => {
    if (errorsStore) {
      setLogin({ ...login, errors: errorsStore });
    }
  }, [errorsStore]);

  return (
    <div className="sign-in-parent">
      <div className="sign-in-image">
        <h1>Hello :)</h1>
        <img src={Background} alt="login-background" />
      </div>
      <div className="sign-in">
        <h2 className="title">Login our community!</h2>
        <span>
          Don't have an account ?{" "}
          <strong>
            <Link to="/signup">Sign Up</Link>
          </strong>
        </span>

        <form onSubmit={handleSubmit} noValidate>
          {/* <div className="required-field">* required field</div> */}
          <FormInput
            handleChange={handleChange}
            name="email"
            className={classnames("form-input", {
              "form-input-invalid": login.errors.email
            })}
            type="email"
            value={login.email}
            label="Email*"
          />

          {login.errors.email && (
            <div className="isError"> {login.errors.email} </div>
          )}

          <FormInput
            handleChange={handleChange}
            name="password"
            type="password"
            className={classnames("form-input", {
              "form-input-invalid": login.errors.password
            })}
            value={login.password}
            label="Password*"
          />

          {login.errors.password && (
            <div className="isError"> {login.errors.password} </div>
          )}

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
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

export default SignIn;
