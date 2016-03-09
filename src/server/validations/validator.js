var _ = require('underscore');

module.exports = {
  validate: validate
};

// Validate User Model
function validate(model, validationProps, cb) {
  var errorMessage;

  for (var key in model) {
    // Required
    var isNumber = validationProps[key].isNumber;
    var isUndefined = model[key] === undefined;
    var isEmpty = model[key] === '';

    if ((isUndefined || isEmpty || (isNumber && isNaN(model[key]))) && typeof model[key] !== 'boolean') {
      errorMessage = 'All fields are required';
      break;
    }

    if (key in validationProps) {
      // Max Length
      if (model[key].toString().length > validationProps[key].max) {
        errorMessage = titleize(key) + ' must be less than or equal to ' + validationProps[key].max + ' characters';
        break;
      }

      // Min Length
      if (model[key].toString().length < validationProps[key].min) {
        errorMessage = titleize(key) + ' must be greater than or equal to ' + validationProps[key].min + ' characters';
        break;
      }

      // // No special characters
      // var specialCharRegEx = new RegExp(/[<>\/]/);
      // if (specialCharRegEx.test(model[key])) {
      //   errorMessage = titleize(key) + ' must not contain special characters';
      //   break;
      // }

      // Email
      if (validationProps[key].email) {
        var emailRegEx = new RegExp(/@/);

        if (!emailRegEx.test(model[key])) {
          errorMessage = 'Email must be an email address';
          break;
        }
      }

      // Letters Only
      if (validationProps[key].lettersOnly) {
        var lettersRegEx = new RegExp(/[^A-z]/);

        if (lettersRegEx.test(model[key])) {
          errorMessage = titleize(key) + ' must only contain letters';
          break;
        }
      }

      // Numbers Only
      if (validationProps[key].numbersOnly) {
        var numbersRegEx = new RegExp(/[^0-9]/);

        if (isNaN(model[key]) || numbersRegEx.test(model[key])) {
          errorMessage = titleize(key) + ' must only contain numbers';
          break;
        }
      }

      // Float Only
      if (validationProps[key].allowFloat) {
        var floatRegEx = new RegExp(/[-+]?\d+[.]\d+(?![A-z])/g);

        if (!floatRegEx.test(model[key])) {
          errorMessage = titleize(key) + ' must only contain decimal point numbers';
          break;
        }
      }
    }
  }

  return cb(errorMessage);
}

// Utils
function titleize(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
