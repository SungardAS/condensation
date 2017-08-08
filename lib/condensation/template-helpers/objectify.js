var _ = require("lodash");
var cValue = require("./cValue");
var cUtil = require("../util");

/**
 * Return options as a stringified object
 * @function objectify
 * @memberof TemplateHelpers
 * @example
 * {{objectify Param1="Value1" Param2=(ref "AWS::Region")}}
 * @param {...kv} [options] - Key/Value pairs to pass to the particle helper
 * @returns {String} - When parsed will be an object
 *
 */
module.exports= function objectify () {
  var options = arguments[arguments.length-1];

  var hash = options.hash;

  var obj = {};

  _.each(_.toPairs(hash), function(kv) {
    if (!_.isNil(hash[kv[0]])) {

      obj[kv[0]] = cUtil.parse(kv[1]);
    }
  });

  return cUtil.dump({
    hData: options.data,
    obj: obj
  });
};

