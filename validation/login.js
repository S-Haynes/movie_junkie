const validator = require("validator");

const checkLoginValidation = data => {
  const errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }

  if (!validator.isLength(data.password, { min: 3, max: 20 })) {
    errors.password = "Password must be between 3 and 20 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = checkAuthValidation;
