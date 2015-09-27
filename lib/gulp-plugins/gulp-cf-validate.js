var AWS = require('aws-sdk'),
gutil = require('gulp-util'),
through = require('through2'),
backoff = require('backoff'),
fs = require('fs-extra'),
path = require('path'),
PluginError = gutil.PluginError;


const PLUGIN_NAME = 'gulp-cf-validate';

function validator(opts) {
  var cloudformation = new AWS.CloudFormation(opts);
  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    var retry = backoff.exponential();
    retry.failAfter(20);

    retry.on('ready', function(number,delay) {
      if (file.contents) {
        cloudformation.validateTemplate({
          TemplateBody: file.contents.toString()
        },function(err,data) {
          if (err && err.code === "Throttling") {
            //console.log(new PluginError(PLUGIN_NAME,"RETRY VALIDATE (throttled) count:" + number + " delay:" + delay + " file:" + file.path));
            retry.backoff();
          }
          else if (err) {
            console.log(new PluginError(PLUGIN_NAME, file.path));
            fs.outputFile(path.join('condensation_errors',file.path),file.contents,function(ofErr) {
              if (ofErr) {
                console.log(new PluginError(PLUGIN_NAME, file.contents));
              }
              cb(err,file);
            });
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
}


module.exports = validator;
