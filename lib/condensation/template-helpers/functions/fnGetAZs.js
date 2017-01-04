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
module.exports = function(region, options) {
  options = _.merge({hash: {}}, options);

  region = cValue(region, options);

  return '{"Fn::GetAZs": '+region+'}';

};
