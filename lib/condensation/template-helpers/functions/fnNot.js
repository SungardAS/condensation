var _ = require("lodash");
var cUtil = require("../../util");

/**
 * Fn::Not definition
 * @example
 * {{fnNot "Condition1"}}
 * @example
 * {{fnNot (fnEquals (ref "ParameterName") "value") }}
 * @function fnNot
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} condition - condition to evaluate
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 */
module.exports = function fnNot(v1,options) {
  v1 = cUtil.parse(v1);

  if (_.isString(v1)) {
    v1 = {"Condition": v1};
  }

  var fnObj = {
    "Fn::Not": [v1]
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};
