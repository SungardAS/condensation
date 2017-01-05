var _ = require('lodash');

/**
 * Coerce Value
 *
 * Will check to see if a string is a parsable object. If it is,
 * then it will be left alone and simply returned back.
 *
 * If the string is not a parseable object it will be made JSON compliant and returned.
 *
 * If the string is empty, null, undefined or otherwise `falsey` then an empty string will be returned.
 *
 * @module cValue
 * @type {function}
 * @param {string} str - The string to evaluate
 * @param {Object} options - options object from Handlebars
 * @param {Object} options.hash - options for parsing
 * @param {boolean} options.hash.forceNumber - Force the return of a number instead of a string
 * @returns {String|Number}
 *
 */
module.exports = function cValue(str,options) {
  options = options || {};
  var isObject = false;

  if (_.isPlainObject(str) || _.isArray(str) || _.isNumber(str)) {
    return JSON.stringify(str);
  }
  else {
    try {
      var check = JSON.parse(str)
      if (_.isBoolean(check)) {
        throw("boolean");
      }
      if (_.isNumber(check) && !options.hash.forceNumber) {
        throw("number");
      }

      return str;
    }
    catch(e) {
      var returnStr = JSON.stringify(str) || '""';
      return returnStr;
    }
  }

};

