/**
 * Concatenates two or more strings
 * @module concat
 * @type {function}
 * @example
 * {{concat "string1" "string2"}}
 * @param {...string} string - two or more strings to concatenate
 * @returns {String} - One concatenated string
 *
 */
module.exports = function concat() {
  var args = arguments;
  var string = "";
  for (var i=0;i<args.length-1;i++) {
    string = string + args[i];
  }
  return string;
};
