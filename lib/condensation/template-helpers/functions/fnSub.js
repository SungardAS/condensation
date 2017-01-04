var _ = require("lodash");
var cValue = require("../cValue");

/*
 * Will create a reference to a logicalId within the template based on it's scope.
 * If scope is enabled the logicalIdPrefix and logicalIdSuffix will be added automatically.
 *
 * @param {string}  - The logicalId to reference
 * @param {Object} options - options for creting the logicalId reference
 * @param {Boolean} [options.scope=true] - Whether to scope the logicalId or not
 * @return {String} A JSON compliant Ref object for CloudFormation
 */
module.exports = function() {
  var str = arguments[0];
  var variableMap = {};
  var options = arguments[arguments.length-1];
  options = _.merge({hash: {}}, options);

  if (arguments.length === 3) {
    variableMap = arguments[1];
  };

  return '{"Fn::Sub": ['+cValue(str)+','+cValue(variableMap)+']}';

};
