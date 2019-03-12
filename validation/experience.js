const Validator = require("validator");
const isEmpty = require("./is-empty");

// this function will be accessible outside
module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Because validator only works with string - could use lodash
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors) // as errors is an object, create a check function to ensure it works with validator
  };
};
