var _ = require("lodash");
var cUtil = require("../../util");

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
module.exports = function fnSplit(delimiter,str,options) {

  var fnObj = {
    "Fn::Split": [
      cUtil.parse(delimiter),
      cUtil.parse(str)
    ]
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};
