var cValue = require("../cValue");
/*
 * Creates the intrinsic function Fn::Base64
 *
 * @param {String} str - The string to evaluate
 * @param {Object} options - Passed in by Handlebars
 * @return {String}
 */
module.exports = function(str, options) {
  return '{"Fn::Base64": '+cValue(str,options)+'}';
};

