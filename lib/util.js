var _ = require('lodash');

exports.genTaskNameFunc = function(options) {
  options = _.merge({
    separator: ':'
  },options);

  var genTaskNameFunc = function() {
    var validParts = _.dropWhile(_.flatten([this.prefix,arguments]),function(item) {
      return !item;
    });
    return validParts.join(this.separator);
  };

  return genTaskNameFunc.bind(options);
};

