var _ = require("lodash");
var cValue = require("../cValue");

/**
 * Fn::Split definition
 * @example
 * {{fnSplit ":" "split:me"}}
 * @function fnSplit
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} delimiter - A string value that determines where the source string is divided
 * @param {string} str - A string
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 */
module.exports = function fnSplit(delimiter,str) {

  return '{"Fn::Split": ['+cValue(delimiter)+','+cValue(str)+']}';

};
