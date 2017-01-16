var _ = require("lodash");
var scopeId = require("../scopeId");

/**
 * Ref definition
 * @example
 * {{ref "Parameter1"}}
 * @example
 * {{ref "Parameter2" scope=false}}
 * @function ref
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} logicalId - The logicalId to reference
 * @param {Object} options - passed by handlebars
 * @param {Object} [options.hash] - Named parameters used for ref options
 * @param {Boolean} [options.hash.scope=true] - Whether to scope the logicalId or not
 * @return {String} A JSON compliant Ref object for CloudFormation
 */
module.exports = function ref(str,options) {
  options = _.merge({hash: {}}, options);
  if (options.hash.scope !== false) {
    str = scopeId.apply(this,[str]);
  }
  return ['{"Ref": "',str,'"}'].join('');
};

