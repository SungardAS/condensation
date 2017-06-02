var cValue = require("../cValue");

/**
 * Fn::Base64 definition
 * @function fnBase64
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} str - The string to evaluate
 * @param {Object} options - Passed in by Handlebars
 * @returns {string}
 */
module.exports = function fnBase64() {
  var str = "";
  var options = arguments[arguments.length-1];

  if (options.fn) {
    str = options.fn(this);
  }
  else {
    str = arguments[0];
  }

  return '{"Fn::Base64": '+cValue(str,options)+'}';
};

