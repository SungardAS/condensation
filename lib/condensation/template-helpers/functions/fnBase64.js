var cValue = require("../cValue");

/**
 * Fn::Base64 definition
 * @module fnBase64
 * @memberof "TemplateHelpers.Functions"
 * @type {function}
 * @param {string} str - The string to evaluate
 * @param {Object} options - Passed in by Handlebars
 * @returns {string}
 */
module.exports = function fnBase64(str, options) {
  return '{"Fn::Base64": '+cValue(str,options)+'}';
};

