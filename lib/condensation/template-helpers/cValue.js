/**
 * Coerce Value
 *
 * Will check to see if a string is a parsable object. If it is,
 * then it will be left alone and simply returned back.
 *
 * If the string is not a parseable object it will be made JSON compliant and returned.
 *
 * If the string is empty, null, undefined or otherwise `falsey` then an empty string will be returned.
 * @summary Coerce value
 * @example
 * ---
 * foo: bar
 * baz: {"Ref": "LogicalId"}
 * faz: "5"
 * ---
 * {{cValue foo}}
 * {{cValue baz}}
 * {{cValue faz forceNumber=true}}
 * @function cValue
 * @memberof TemplateHelpers
 * @param {string} str - The string to evaluate
 * @param {Object} options - options object from Handlebars
 * @param {boolean} options.forceNumber - return a number at all costs
 * @returns {string|Number}
 *
 */

var _ = require("lodash");
var cUtil = require("../util");

module.exports = function cValue(str,options) {
  options = _.merge({
    hash: {
      forceNumber: false
    }
  },options);

  if (_.isPlainObject(str) || _.isArray(str) || _.isNumber(str)) {
    return cUtil.dump({
      hData: options.data,
      obj: str
    });
  }
  else {
    var dumpMe = check = cUtil.parse(str);

    if (_.isNumber(check) && !options.hash.forceNumber) {
      dumpMe = str;
    }

    if (_.isString(check)) {
      dumpMe = str;
    }

    var returnStr = cUtil.dump({
      hData: options.data,
      obj: dumpMe
    }) || '""';
    return returnStr;

  }

};

