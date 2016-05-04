var _ = require("lodash");
var scopeId = require("./scopeId");

/*
 * Will create a reference to a logicalId within the template based on it's scope.
 * If scope is enabled the logicalIdPrefix and logicalIdSuffix will be added automatically.
 *
 * @param {string}  - The logicalId to reference
 * @param {Object} options - options for creting the logicalId reference
 * @param {Boolean} [options.scope=true] - Whether to scope the logicalId or not
 * @return {String} A JSON compliant Ref object for CloudFormation
 */
module.exports = function(str,options) {
  options = _.merge({hash: {}}, options);
  if (options.hash.scope !== false) {
    str = scopeId.apply(this,[str]);
  }
  return ['{"Ref": "',str,'"}'].join('');
};

