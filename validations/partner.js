const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validatePartnerProfileUpdate = data => {
  let errors = {};

  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.services = !isEmpty(data.services) ? data.services : "";
  data.ratePerHour = !isEmpty(data.ratePerHour) ? data.ratePerHour : "";
  data.currentLocation = !isEmpty(data.currentLocation)
    ? data.currentLocation
    : "";

  // phone number Validation
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

  // currentLocation Validation

  if (Array.isArray(data.currentLocation)) {
    currL = data.currentLocation.toString();
    if (Validator.isEmpty(currL)) {
      errors.currentLocation = "Current Location is required";
    }
  }

  // services Validation

  if (Array.isArray(data.services)) {
    for (let index = 0; index < data.services.length; index++) {
      if (
        !Validator.equals(data.services[index], "Plumbing") &&
        !Validator.equals(data.services[index], "Carpentry") &&
        !Validator.equals(data.services[index], "Cleaning") &&
        !Validator.equals(data.services[index], "Electrical") &&
        !Validator.equals(data.services[index], "Appliances") &&
        !Validator.equals(data.services[index], "Painting")
      ) {
        errors.services = "Invalid Service Type";
      }
    }
  } else {
    let servicesInput = data.services.split(",");
    for (let index = 0; index < servicesInput.length; index++) {
      if (
        !Validator.equals(servicesInput[index], "Plumbing") &&
        !Validator.equals(servicesInput[index], "Carpentry") &&
        !Validator.equals(servicesInput[index], "Cleaning") &&
        !Validator.equals(servicesInput[index], "Electrical") &&
        !Validator.equals(servicesInput[index], "Appliances") &&
        !Validator.equals(servicesInput[index], "Painting")
      ) {
        errors.services = "Invalid Service Type";
      }
    }
  }
  if (data.services.length === 0) {
    errors.services = "Services required";
  }

  // rate per hour Validation
  if (!Array.isArray(data.rateInput)) {
    let rateInput = [data.ratePerHour];
    let servicesInput = [data.services];
    if (servicesInput.length !== rateInput.length) {
      errors.ratePerHour = "Rate per hour length must be same as services";
    }
  } else {
    let rateInput = data.ratePerHour.split(",");
    let servicesInput = data.services.split(",");
    if (servicesInput.length !== rateInput.length) {
      errors.ratePerHour = "Rate per hour length must be same as services";
    }
  }

  if (data.ratePerHour.length === 0) {
    errors.ratePerHour = "Rate per hour required";
    3;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// const Validator = require("validator");
// const isEmpty = require("./is-Empty");

// module.exports = validatePartnerProfileUpdate = data => {
//   let errors = {};

//   data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
//   data.services = !isEmpty(data.services) ? data.services : [];
//   data.ratePerHour = !isEmpty(data.ratePerHour) ? data.ratePerHour : [];
//   data.currentLocation = !isEmpty(data.currentLocation)
//     ? data.currentLocation
//     : [];

//   const checkUpdatedArrayData = field => {
//     if (Array.isArray(field)) {
//       field = field.toString();
//     }
//     return field;
//   };
//   data.currentLocation = checkUpdatedArrayData(data.currentLocation);
//   data.services = checkUpdatedArrayData(data.services);
//   data.ratePerHour = checkUpdatedArrayData(data.ratePerHour);

//   // phone number Validation
//   console.log("Validations File : ", data);

//   // if (!Validator.isEmpty(data.services)) {
//   //   let input = data.services.split(",");
//   //   console.log("Input Service Types : ", input);
//   //   for (let index = 0; index < input.length; index++) {
//   //     if (
//   //       !Validator.equals(input[index], "Plumbing") &&
//   //       !Validator.equals(input[index], "Carpentry") &&
//   //       !Validator.equals(input[index], "Cleaning") &&
//   //       !Validator.equals(input[index], "Electrical") &&
//   //       !Validator.equals(input[index], "Appliances") &&
//   //       !Validator.equals(input[index], "Painting")
//   //     ) {
//   //       errors.services = "Invalid Service Type";
//   //     }
//   //   }
//   // }

//   if (data.currentLocation.length === 0) {
//     errors.currentLocation = "Cities are required";
//   }

//   if (data.services.length === 0) {
//     errors.services = "Services are required";
//   }

//   if (
//     !Validator.isMobilePhone(data.phoneNumber) ||
//     !Validator.isLength(data.phoneNumber, {
//       min: 10,
//       max: 10
//     })
//   ) {
//     errors.phoneNumber = "Invalid Phone number";
//   }
//   if (Validator.isEmpty(data.phoneNumber)) {
//     errors.phoneNumber = "Phone Number is required";
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };
