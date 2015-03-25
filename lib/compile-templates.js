var AWS = require('aws-sdk'),
gutil = require('gulp-util'),
through = require('through2'),
Handlebars = require('handlebars'),
PluginError = gutil.PluginError;


const PLUGIN_NAME = 'condensation-compile-template';

function validator(opts) {

  var stream = through.obj(function(file, enc, cb) {
    var self = this;
  });

  // returning the file stream
  return stream;
};


module.exports = validator;
