const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validateUserReview = data => {
  let errors = {};

  data.rating = !isEmpty(data.rating) ? data.rating : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (!Validator.isNumeric(data.rating)) {
    errors.rating = "Rating must be number";
  }
  if (Validator.isEmpty(data.rating)) {
    errors.rating = "Rating is required";
  }
  if (!Validator.isEmpty(data.comment)) {
    if (
      !Validator.isLength(data.comment, {
        min: 2,
        max: 100
      })
    ) {
      errors.comment = "Comment Must be between 2 and 100 character";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
