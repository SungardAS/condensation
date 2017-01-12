var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Select definition
 * @example
 * {{fnSelect 0 (ref "ParameterList")}}
 * @example
 * {{fnSelect 0 "value1" "value2"}}
 * @module fnSelect
 * @type {function}
 * @param {Number} index - array member to pick
 * @param {...string} 
 * @param {Object} options - options passed by handlebars
 * @returns {string} A JSON compliant Ref object for CloudFormation
 */
module.exports = function fnSelect() {
  var index = cValue(arguments[0]);
  var joinValues = _.slice(arguments, 1, arguments.length-1);
  var options = arguments[arguments.length-1];

  joinValues = _.map(joinValues, function(v) { return cValue(v) });

  var list;
  if (joinValues.length === 1) {
    list = joinValues[0];
  }
  else {
    list = '['+joinValues.join(",")+']';
  }

  options = _.merge({hash: {}}, options);

  return '{"Fn::Select": ['+index+','+list+']}';

};
