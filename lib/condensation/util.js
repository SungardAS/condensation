var _ = require('lodash'),
path = require('path');

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

exports.genDistPath = function(options) {
  var opts = _.merge({
    root: 'dist',
    s3prefix: '',
    id: null
  },options);

  return(
    path.join.apply(
      null,
      _.flatten([
        opts.root,
        opts.id,
        opts.s3prefix
      ])
    )
  );

};
