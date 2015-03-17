var AWS = require('aws-sdk'),
gutil = require('gulp-util'),
through = require('through2'),
backoff = require('backoff'),
PluginError = gutil.PluginError;


const PLUGIN_NAME = 'gulp-cf-validate';

function validator(opts) {
  var cloudformation = new AWS.CloudFormation(opts);
  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    var self = this;
    var retry = backoff.exponential();
    retry.failAfter(10);

    retry.on('ready', function(number,delay) {
      if (file.contents) {
        cloudformation.validateTemplate({
          TemplateBody: file.contents.toString()
        },function(err,data) {
          if (err) {
            console.warn(err);
            console.log("RETRY VALIDATE: " + file.path);
            retry.backoff();
          }
          else {
            cb(err,file);
          }
        });
      }
      else {
        cb(null,file);
      }
    });

    retry.backoff();


  });

  // returning the file stream
  return stream;
};


module.exports = validator;
