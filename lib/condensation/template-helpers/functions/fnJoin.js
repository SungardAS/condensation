var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Join definition
 * @function fnJoin
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {array|string|...string} arr - if one parameter, it will be used as the array.  If multiple, they will be joined to form the array.
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 * @example
 * {{fnJoin "," (ref "Parameter1") }}
 * @example
 * {{fnJoin "," (fnGetAZs (ref "AWS::Region")) }}
 * @example
 * {{fnJoin "," "one" (ref "Parameter") "three"}}
 */
module.exports = function fnJoin() {
  var delimiter = cValue(arguments[0]);
  var joinValues = _.slice(arguments, 1, arguments.length-1);
  var options = arguments[arguments.length-1];

  var arr;
  if (joinValues.length === 1)
    arr = cValue(joinValues[0]);
  else {
   var joinValues = _.map(joinValues, function(v) { return cValue(v) });
   arr = '['+joinValues.join(",")+"]";
  }

  options = _.merge({hash: {}}, options);

  return '{"Fn::Join": ['+delimiter+','+arr+']}';

};
