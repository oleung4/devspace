const Validator = require("validator");
const isEmpty = require("./is-empty");

// this function will be accessible outside
module.exports = function validatePostInput(data) {
  let errors = {};

  // Because validator only works with string - could use lodash
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors) // as errors is an object, create a check function to ensure it works with validator
  };
};
