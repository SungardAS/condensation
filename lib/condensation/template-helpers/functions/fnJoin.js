var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Join definition
 * @function fnJoin
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {...string} str - strings to join together
 * @param {Object} options - options passed by handlebars
 * @returns {string} A JSON compliant Ref object for CloudFormation
 */
module.exports = function fnJoin() {
  var delimiter = cValue(arguments[0]);
  var joinValues = _.slice(arguments, 1, arguments.length-1);
  var options = arguments[arguments.length-1];

  joinValues = _.map(joinValues, function(v) { return cValue(v) });

  options = _.merge({hash: {}}, options);

  return '{"Fn::Join": ['+delimiter+',['+joinValues.join(",")+']]}';

};
