var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::And definition
 * @function fnAnd
 * @memberof "IntrinsicFunctions"
 * @param {...string} condition - Any number of conditions
 * @param {Object} options - options passed by handlebars
 * @returns {string}
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
