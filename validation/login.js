const Validator = require("validator");
const isEmpty = require("./is-empty");

// this function will be accessible outside
module.exports = function validateLoginInput(data) {
  let errors = {};

  // Because validator only works with string - could use lodash
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors) // as errors is an object, create a check function to ensure it works with validator
  };
};
