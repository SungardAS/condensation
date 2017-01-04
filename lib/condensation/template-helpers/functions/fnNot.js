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
module.exports = function(v1,options) {
  v1 = cValue(v1);
  options = _.merge({hash: {}}, options);

  if (v1.charAt(0) === '"') {
    v1 = '{"Condition": '+v1+'}';
  }

  return '{"Fn::Not": ['+v1+']}';

};
