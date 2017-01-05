/*
 * @return {String} - JSON.stringify result of block
 *
 */

module.exports = function(content) {
  var options = arguments[arguments.length-1];
  if (options.fn) {
    content = options.fn(this);
  }

  if (options.hash.noLineBreaks) {
    content = content.replace(/(\r\n|\n|\r)/gm, '');
  }
  return JSON.stringify(content)
};
