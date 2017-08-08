var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::GetAtt definition
 * @function fnGetAtt
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} logicalId - resource that contains the attribute you want
 * @param {string} attributeName - name of the resource-specific attribute whose value you want
 * @param {Object} options - options for creting the logicalId reference
 * @returns {string} A JSON compliant string for CloudFormation
 */
module.exports = function fnGetAtt(logicalId, attributeName, options) {
  logicalId = cValue(logicalId, options);
  attributeName = cValue(attributeName, options);

  options = _.merge({hash: {}}, options);

  return '{"Fn::GetAtt": ['+[logicalId,attributeName].join(",")+']}';

};

