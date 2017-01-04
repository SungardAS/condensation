var _ = require("lodash");
var cValue = require("../cValue");

/*
 * @param {...String} condition - One to many conditions
 * @param {Object} options - options passed by handlebars
 * @return {String} A JSON compliant Ref object for CloudFormation
 */
module.exports = function() {
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
