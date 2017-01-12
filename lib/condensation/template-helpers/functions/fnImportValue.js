var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::ImportValue definition
 * @module fnImportValue
 * @type {function}
 * @param {string} sharedValue - name of the shared value
 * @param {Object} options - options passed by handlebars
 * @returns {string} A JSON compliant Ref object for CloudFormation
 */
module.exports = function fnImportValue(sharedValue, options) {
  options = _.merge({hash: {}}, options);

  sharedValue = cValue(sharedValue, options);

  return '{"Fn::ImportValue": '+sharedValue+'}';

};
