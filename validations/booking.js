const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = bookingInput = data => {
  let errors = {};

  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.selectedForDateTo = !isEmpty(data.selectedForDateTo)
    ? data.selectedForDateTo
    : "";
  data.selectedForDateFrom = !isEmpty(data.selectedForDateFrom)
    ? data.selectedForDateFrom
    : "";
  data.bookedForService = !isEmpty(data.bookedForService)
    ? data.bookedForService
    : "";

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zip code is required";
  }
  if (Validator.isEmpty(data.bookedForService)) {
    errors.bookedForService = "Service is required";
  }
  if (Validator.isEmpty(data.selectedForDateFrom)) {
    errors.selectedForDateFrom = "From date is required";
  }
  if (Validator.isEmpty(data.selectedForDateTo)) {
    errors.selectedForDateTo = "To date is required";
  }
  if (data.selectedForDateFrom > data.selectedForDateTo) {
    errors.selectedForDateFrom = "From date should be less then to date";
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
