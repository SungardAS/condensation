var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Not definition
 * @example
 * {{fnNot "Condition1"}}
 * @example
 * {{fnNot (fnEquals (ref "ParameterName") "value") }}
 * @module fnNot
 * @memberof TemplateHelpers.Functions
 * @type {function}
 * @param {string} condition - condition to evaluate
 * @param {Object} options - options passed by handlebars
 * @returns {string} A JSON compliant Ref object for CloudFormation
 */
module.exports = function fnNot(v1,options) {
  v1 = cValue(v1);
  options = _.merge({hash: {}}, options);

  if (v1.charAt(0) === '"') {
    v1 = '{"Condition": '+v1+'}';
  }

  return '{"Fn::Not": ['+v1+']}';

};
