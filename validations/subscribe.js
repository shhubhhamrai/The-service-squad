const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validateSubscribeInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
