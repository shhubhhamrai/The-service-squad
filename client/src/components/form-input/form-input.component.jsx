import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, errors, ...otherProps }) => (
  <div className="group">
    <input onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label `}
      >
        {label}
      </label>
    ) : null}

    {/* { errors.email && <div className="invalid-feedback"> {errors.email} </div>} */}
  </div>
);

export default FormInput;
