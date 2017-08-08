var _ = require("lodash");
var cUtil = require("../../util");

/**
 * Fn::Join definition
 * @function fnJoin
 * @memberof "IntrinsicFunctions"
 * @type {function}
 * @param {array|string|...string} arr - if one parameter, it will be used as the array.  If multiple, they will be joined to form the array.
 * @param {Object} options - options passed by handlebars
 * @returns {string}
 * @example
 * {{fnJoin "," (ref "Parameter1") }}
 * @example
 * {{fnJoin "," (fnGetAZs (ref "AWS::Region")) }}
 * @example
 * {{fnJoin "," "one" (ref "Parameter") "three"}}
 */
module.exports = function fnJoin() {
  var options = arguments[arguments.length-1];
  var delimiter = cUtil.parse(arguments[0]);
  var joinValues = _.slice(arguments, 1, arguments.length-1);

  var arr = _.map(joinValues, function(v) {
    return cUtil.parse(v);
  });
  if (arr.length === 1) {
    arr = arr[0]
  };

  var fnObj = {
    "Fn::Join": [
      delimiter,
      arr
    ]
  };

  return cUtil.dump({
    hData: options.data,
    obj: fnObj
  });

};
