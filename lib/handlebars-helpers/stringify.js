/**
 * JSON.stringify a string or block
 * @function stringify
 * @memberof HandlebarsHelpers
 * @example
 * {{stringify "a !string for {json} /end"}}
 * @example
 * {{#stringify}}
 *   mybash.sh -o option1
 *   continue.sh
 * {{/stringify}}
 * @example
 * {{#stringify noLineBreaks}}
 *   docker run
 *   -e VAR1=VAL1
 *   -e VAR2=VAL2
 *   my/image
 * {{/stringify}}
 * @param {string=} string - String to use if block is not present
 * @returns {String} - JSON.stringify result of block or string
 *
 */
module.exports= function stringify (content) {
  var options = arguments[arguments.length-1];
  if (options.fn) {
    content = options.fn(this);
  }

  if (options.hash.noLineBreaks) {
    content = content.replace(/(\r\n|\n|\r)/gm, '');
  }
  return JSON.stringify(content)
};

