var _ = require("lodash");
var cValue = require("../cValue");

/*
 * @param {string} logicalId - resource that contains the attribute you want
 * @param {string} attributeName - name of the resource-specific attribute whose value you want
 * @param {Object} options - options for creting the logicalId reference
 * @return {String} A JSON compliant string for CloudFormation
 */
module.exports = function(logicalId, attributeName, options) {
  logicalId = cValue(logicalId);
  attributeName = cValue(attributeName);

  options = _.merge({hash: {}}, options);

  return '{"Fn::GetAtt": ['+[logicalId,attributeName].join(",")+']}';

};

