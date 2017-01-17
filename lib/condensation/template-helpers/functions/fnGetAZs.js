var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::GetAZs definition
 * @function fnGetAZs
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} region - name of the region
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 */
module.exports = function fnGetAZs(region, options) {
  options = _.merge({hash: {}}, options);

  region = cValue(region, options);

  return '{"Fn::GetAZs": '+region+'}';

};
