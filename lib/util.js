var _ = require('lodash');

exports.genTaskNameFunc = function(options) {
  options = _.merge({
    separator: ':'
  },options);

  var genTaskNameFunc = function() {
    return taskName = _.compact(_.flatten([this.prefix,arguments])).join(this.separator);
  };

  return genTaskNameFunc.bind(options);
};

