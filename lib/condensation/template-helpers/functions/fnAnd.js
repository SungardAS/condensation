var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::And definition
 * @module fnAnd
 * @memberof "TemplateHelpers.Functions"
 * @type {function}
 * @param {...string} condition - Any number of conditions
 * @param {Object} options - options passed by handlebars
 * @returns {string} A JSON compliant Ref object for CloudFormation
 */
module.exports = function fnAnd() {
  var joinValues = _.slice(arguments, 0, arguments.length-1);
  var options = arguments[arguments.length-1];

  joinValues = _.map(joinValues, function(v) {
    var v = cValue(v)
    if (v.charAt(0) === '"') {
      v = '{"Condition": '+v+'}';
    }
    return v;
  });

  return '{"Fn::And": ['+joinValues.join(",")+']}';

};
