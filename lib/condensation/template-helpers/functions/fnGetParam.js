var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::GetParam definition
 * @function fnGetParam
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} artifactName - The name of the artifact, which must be included as an input artifact for the associated action
 * @param {string} JSONFileName - The name of a JSON file that is contained in the artifact
 * @param {string} keyName - The name of the key whose value you want to retrieve
 * @param {Object} options - options for creting the logicalId reference
 * @return {string} A JSON compliant string for CloudFormation
 */
module.exports = function fnGetParam(artifactName, JSONFileName, keyName, options) {
  options = _.merge({hash: {}}, options);

  artifactName = cValue(artifactName, options);
  JSONFileName = cValue(JSONFileName, options);
  keyName = cValue(keyName, options);

  return '{"Fn::GetParam": ['+[artifactName,JSONFileName,keyName].join(",")+']}';

};

