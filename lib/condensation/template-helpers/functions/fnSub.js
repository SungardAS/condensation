var _ = require("lodash");
var cValue = require("../cValue");

/*
 * Will create a reference to a logicalId within the template based on it's scope.
 * If scope is enabled the logicalIdPrefix and logicalIdSuffix will be added automatically.
 *
 * @param {string}  - The logicalId to reference
 * @param {Object} options - options for creting the logicalId reference
 * @param {Boolean} [options.scope=true] - Whether to scope the logicalId or not
 * @return {String} A JSON compliant Ref object for CloudFormation
 */
module.exports = function() {
  var str = "";
  var options = arguments[arguments.length-1];
  var variableMap = _.mapValues(options.hash, function(v) {
    var r = cValue(v);
    if (r.charAt(0) === '"') {
      return v;
    }
    return JSON.parse(r);
  });

  if (options.fn) {
    str = options.fn(this);
    withArgLength = 2;
  }
  else {
    str = arguments[0];
  }

  return '{"Fn::Sub": ['+cValue(str)+','+JSON.stringify(variableMap)+']}';

};
