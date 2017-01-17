var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Or definition
 * @function fnOr
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {...string} condition - One to many conditions
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 */
module.exports = function fnOr() {
  var joinValues = _.slice(arguments, 0, arguments.length-1);
  var options = arguments[arguments.length-1];

  joinValues = _.map(joinValues, function(v) {
    var v = cValue(v)
    if (v.charAt(0) === '"') {
      v = '{"Condition": '+v+'}';
    }
    return v;
  });

  return '{"Fn::Or": ['+joinValues.join(",")+']}';

};
