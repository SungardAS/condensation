var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Sub definition
 * @example
 * {{fnSub "The current region is ${AWS::Region"}}
 * @example
 * {{fnSub "Use this URL ${Url}" Url=(partial "buildUrl") }}
 * @function fnSub
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} str - String with replacement variables defined
 * @param {Object} options - options passed by handlebars
 * @param {Object} options.hash - all named parameters will be used for the variableMap
 * @returns {string}
 */
module.exports = function fnSub() {
  var str = "";
  var options = arguments[arguments.length-1];
  var variableMap = _.mapValues(options.hash, function(v) {
    var r = cValue(v);
    if (_.isString(r) && r.charAt(0) === '"') {
      return v;
    }
    return JSON.parse(r);
  });

  if (options.fn) {
    str = options.fn(this);
  }
  else {
    str = arguments[0];
  }

  return '{"Fn::Sub": ['+cValue(str)+','+JSON.stringify(variableMap)+']}';

};
