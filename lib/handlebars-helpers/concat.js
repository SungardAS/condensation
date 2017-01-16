var _ = require("lodash");

/**
 * Concatenates two or more strings
 * @function concat
 * @memberof HandlebarsHelpers
 * @example
 * {{concat "string1" "string2"}}
 * @example
 * {{concat "string1" "string2" separator="-"}}
 * @param {...string} string - two or more strings to concatenate
 * @param {Object} options - passed by handlebars
 * @param {Object} options.hash - named key/value pairs
 * @param {string} options.hash.separator - string to separate each value
 * @returns {String} - One concatenated string
 *
 */
module.exports = function concat() {
  var args = arguments;
  var options = args[args.length-1];
  options = _.merge({hash:{separator:""}},options);

  return _.slice(args,0,args.length-1).join(options.hash.separator);
};
