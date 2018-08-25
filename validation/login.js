const validator = require("validator");

const checkLoginValidation = data => {
  const errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = checkLoginValidation;
