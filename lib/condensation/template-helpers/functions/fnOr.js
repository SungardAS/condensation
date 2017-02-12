var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Or definition
 * @function fnOr
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {...string} condition - One to many conditions
 * @returns {string}
 */
module.exports = function fnOr() {
  var joinValues = _.slice(arguments, 0, arguments.length-1);

  joinValues = _.map(joinValues, function(v) {
    v = cValue(v);
    if (v.charAt(0) === '"') {
      v = '{"Condition": '+v+'}';
    }
    return v;
  });

  return '{"Fn::Or": ['+joinValues.join(",")+']}';

};
