var _ = require("lodash");
var async = require("async");
var path = require("path");
var frontLoader = require("./loaders/front-loader");
var matter = require("gray-matter");

/**
 * Generate a TaskNme based on condensation configuration
 * @this Condensation
 * @param {Object} options - All options
 * @param {string} [options.separator=":"] - The separator to use when joining the parts of the name
 * @returns {genTaskNameFunc~taskNameFunc} - Function that generates task names
 */
exports.genTaskNameFunc = function genTaskNameFunc(options) {
  options = _.merge({
    separator: ':'
  },options);


  /**
   * Make a task name
   * @param {...string} str - Parts of the task name that will be joined together
   * @returns {string} - The full task name
   */
  var taskNameFunc = function taskNameFunc() {
    var validParts = _.dropWhile(_.flatten([this.prefix,arguments]),function(item) {
      return !item;
    });
    return validParts.join(this.separator);
  };

  return taskNameFunc.bind(options);
};

/**
 * Generates a distribution path
 * @this Condensation
 * @param {Object} options - All options
 * @param {string} [options.root="dist"] - The root distribution name
 * @param {string} [options.s3prefix=""] - Prefix to add to all s3 paths
 * @param {string} options.id - The unique ID for this distribution
 * @returns {String} - The distribution path
 */
exports.genDistPath = function genDistPath(options) {
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

/**
 *
 */
exports.processFrontMatter = function processFrontMatter(file, templateData, cb) {
  var self = this;

  var m = matter(file.contents.toString());

  async.forEachOf(
    (m.data.frontload || {}),
    function(value, key, cb) {
      var moduleConfig = _.merge({},value);
      moduleConfig._file = file;
      frontLoader.call(self, moduleConfig, templateData, cb);
    },
    function(err, result) {
      _.merge(m.data, result);
      cb(err, m);
    }
  );

};
