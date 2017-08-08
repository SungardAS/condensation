var _ = require("lodash");
var cValue = require("../cValue");
var cUtil = require("../../util");

/**
 * Fn::Sub definition
 * @example
 * {{fnSub "The current region is ${AWS::Region"}}
 * @example
 * {{fnSub "Use this URL ${Url}" Url=(partial "buildUrl") }}
 * @function fnSub
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {string} str - String with replacement variables defined
 * @param {Object} options - options passed by handlebars
 * @param {Object} options.hash - all named parameters will be used for the variableMap
 * @returns {string}
 */
module.exports = function fnSub() {
  var str = "";
  var options = arguments[arguments.length-1];


  var variableMap = _.mapValues(options.hash, function(v) {
    return cUtil.parse(v);
  });

  if (options.fn) {
    str = options.fn(this);
  }
  else {
    str = arguments[0];
  }

  var fnObj = {
    "Fn::Sub": [
      str,
      variableMap
    ]
  };

  var returnString = cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

  return returnString;

};
