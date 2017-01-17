var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::ImportValue definition
 * @function fnImportValue
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} sharedValue - name of the shared value
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 */
module.exports = function fnImportValue(sharedValue, options) {
  options = _.merge({hash: {}}, options);

  sharedValue = cValue(sharedValue, options);

  return '{"Fn::ImportValue": '+sharedValue+'}';

};
