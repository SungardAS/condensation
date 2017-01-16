var _ = require("lodash");
var cValue = require("./cValue");

/**
 * Turn a string into a JSON parseable array.
 * Each value is processed with `cValue`
 * @function arrayify
 * @memberof TemplateHelpers
 * @example
 * {{arrayify "string" (ref "Parameter1") }}
 * @example
 * {{arrayify (ref "Parameter1")}}
 * @param {...string} str - String to use if block is not present
 * @returns {String} - When parsed will be an array
 *
 */
module.exports= function arrayify () {
  var joinValues = _.slice(arguments, 0, arguments.length-1);
  var options = arguments[arguments.length-1];

  joinValues = _.map(joinValues, function(v) {
    return cValue(v)
  });

  return '['+joinValues.join(",")+']';

};

