var _ = require("lodash");
var cUtil = require("../../util");

/**
 * Fn::Equals definition
 * @function fnEquals
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} v1 - first value to compare
 * @param {string} v2 - second value to compare
 * @returns {string} A JSON compliant string for CloudFormation
 */
module.exports = function fnEquals(v1,v2,options) {
  v1 = cUtil.parse(v1);
  v2 = cUtil.parse(v2);
  options = _.merge({hash: {}}, options);

  var fnObj = {
    "Fn::Equals": [v1,v2]
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};
