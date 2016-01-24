var _ = require('underscore');

module.exports = {
  validate: validate
};

// Validate User Model
function validate(model, validationProps, cb) {
  var errorMessage;

  for (var key in model) {
    // Required
    if (!model[key] && typeof model[key] !== 'boolean') {
      errorMessage = 'All fields are required';
      break;
    }

    if (key in validationProps) {
      // Max Length
      if (model[key].length > validationProps[key].max) {
        errorMessage = titleize(key) + ' must be less than ' + validationProps[key].max + ' characters';
        break;
      }

      // Min Length
      if (model[key].length < validationProps[key].min) {
        errorMessage = titleize(key) + ' must be greater than ' + validationProps[key].min + ' characters';
        break;
      }

      // Email
      if (key.toLowerCase() === 'email') {
        var emailRegEx = new RegExp(/@/);

        if (!emailRegEx.test(model[key])) {
          errorMessage = 'Email must be an email address';
          break;
        }
      }

      // No special characters
      var specialCharRegEx = new RegExp(/[&<>\/]/);
      if (specialCharRegEx.test(model[key])) {
        errorMessage = titleize(key) + ' must not contain special characters';
        break;
      }
    }
  }

  return cb(errorMessage);
}

// Utils
function titleize(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
