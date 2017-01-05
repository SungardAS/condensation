var _ = require('lodash');

/*
 * Coerce Value
 *
 * Will check to see if a string is a parsable object. If it is,
 * then it will be left alone and simply returned back.
 *
 * If the string is not parseable it will be quoted and returned.
 *
 * @param {String} str - The string to evaluate
 * @param {Object} options - Passed in by Handlebars
 * @return {String}
 *
 */
module.exports = function(str,options) {
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
      var returnStr = ['"',str,'"'].join('');
      return returnStr;
    }
  }

};

