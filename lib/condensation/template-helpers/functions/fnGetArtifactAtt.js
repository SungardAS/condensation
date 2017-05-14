var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::GetArtifactAtt definition
 * @function fnGetArtifactAtt
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} artifactName - The name of the input artifact. You must declare this artifact as input for the associated action.
 * @param {string} attributeName - The name of the artifact attribute whose value you want to retrieve. For details about each artifact attribute, see the following Attributes section.
 * @param {Object} options - options for creting the logicalId reference
 * @return {string} A JSON compliant string for CloudFormation
 */
module.exports = function fnGetArtifactAtt(artifactName, attributeName, options) {
  options = _.merge({hash: {}}, options);

  artifactName = cValue(artifactName, options);
  attributeName = cValue(attributeName, options);

  return '{"Fn::GetArtifactAtt": ['+[artifactName,attributeName].join(",")+']}';

};

