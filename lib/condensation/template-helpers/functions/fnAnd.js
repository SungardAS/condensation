var _ = require("lodash");
var cUtil = require("../../util");

/**
 * Fn::And definition
 * @function fnAnd
 * @memberof "IntrinsicFunctions"
 * @param {...string} condition - Any number of conditions
 * @returns {string}
 */
module.exports = function fnAnd() {
  var options = arguments[arguments.length-1];
  var values = _.slice(arguments, 0, arguments.length-1);

  values = _.map(values, function(v) {
    v = cUtil.parse(v);

    if (_.isString(v)) {
      v = {"Condition": v};
    }

    return v;
  });

  var fnObj = {
    "Fn::And": values
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};
