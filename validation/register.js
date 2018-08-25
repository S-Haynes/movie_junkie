const validator = require("validator");

const checkRegisterValidation = data => {
  const errors = {};

  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }

  if (!validator.isLength(data.password, { min: 5, max: 20 })) {
    errors.password = "Password must be between 5 and 20 characters";
  }

  if (!validator.isLength(data.displayname, { min: 3, max: 20 })) {
    errors.displayname = "Display name must be between 3 and 20 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (validator.isEmpty(data.displayname)) {
    errors.displayname = "Display name field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = checkRegisterValidation;
