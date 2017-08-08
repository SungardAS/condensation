var _ = require("lodash");
var cUtil = require("../../util");

/**
 * Fn::GetAtt definition
 * @function fnGetAtt
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} logicalId - resource that contains the attribute you want
 * @param {string} attributeName - name of the resource-specific attribute whose value you want
 * @param {Object} options - options for creting the logicalId reference
 * @returns {string} A JSON compliant string for CloudFormation
 */
module.exports = function fnGetAtt(logicalId, attributeName, options) {
  logicalId = cUtil.parse(logicalId);
  attributeName = cUtil.parse(attributeName);

  options = _.merge({hash: {}}, options);

  var fnObj = {
    "Fn::GetAtt": [
      logicalId,
      attributeName
    ]
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};

