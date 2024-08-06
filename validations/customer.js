const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validateCustomerProfileUpdate = data => {
  let errors = {};

  data.currentCity = !isEmpty(data.currentCity) ? data.currentCity : "";
  data.fullAddress = !isEmpty(data.fullAddress) ? data.fullAddress : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.servicePrefrence = !isEmpty(data.servicePrefrence)
    ? data.servicePrefrence
    : "";

  if (Validator.isEmpty(data.currentCity)) {
    errors.currentCity = "Current City is required";
  }

  if (!Validator.isEmpty(data.servicePrefrence)) {
    let input = data.servicePrefrence.split(",");
    console.log("Input Service Types : ", input);
    for (let index = 0; index < input.length; index++) {
      if (
        !Validator.equals(input[index], "Plumbing") &&
        !Validator.equals(input[index], "Carpentry") &&
        !Validator.equals(input[index], "Cleaning") &&
        !Validator.equals(input[index], "Electrical") &&
        !Validator.equals(input[index], "Appliances") &&
        !Validator.equals(input[index], "Painting")
      ) {
        errors.servicePrefrence = "Invalid Service Type";
      }
    }
  }

  if (
    !Validator.isMobilePhone(data.phoneNumber) ||
    !Validator.isLength(data.phoneNumber, {
      min: 10,
      max: 10
    })
  ) {
    errors.phoneNumber = "Invalid Phone number";
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone Number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
