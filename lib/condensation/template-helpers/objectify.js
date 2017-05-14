var _ = require("lodash");
var cValue = require("./cValue");

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

  var propertiesBlock = [];

  _.each(_.toPairs(hash), function(kv) {
    if (!_.isNil(hash[kv[0]])) {

      // cValue was written to return strings so that it is also compatible
      // as a direct call from a template.  We need to account for that here.
      var property = ['"',kv[0],'":',cValue(hash[kv[0]],options)].join("");

      propertiesBlock.push(property);
    }
  });

  var propertiesBlock = propertiesBlock.join(",");
  return ["{",propertiesBlock,"}"].join("");
};

