var _ = require('lodash');
var cache = require('gulp-cached');
var cfValidate = require('../../gulp-plugins/gulp-cf-validate');
var es = require('event-stream');
var fs = require('fs-extra');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var matter = require('gray-matter');
var path = require('path');
var rename = require('gulp-rename');
var through = require('through2');
var url = require('url');
var util = require("util");


module.exports = function(s3opts,distPath,awsS3) {
  var self = this;

  var templateData = {};
  var urlString = [awsS3.endpoint.href,path.posix.join(s3opts.aws.bucket,s3opts.prefix)].join('');

  templateData.s3 = s3opts.aws;
  templateData.s3.prefix = s3opts.prefix;
  templateData.s3.condensationUrl = url.parse(urlString);

  var stream = es.readable(function(esCount,streamCb) {
    var readable = this;

    var totalCount = 0;
    var lastTotalCount = 0;

    var runStreams = function(globs,options) {
      var s = gulp.src(globs,options)
      .pipe(cache(self.options.projectName+distPath))
      .pipe(gulpif(/\.hbs$/,through.obj(function(file,enc,cb) {
        var m = matter(file.contents.toString());
        var fn = self.handlebars.compile(m.content,{noEscape:true});
        var templatePath = file.relative.replace(/\.hbs$/,"");
        file.contents = new Buffer(fn(
          _.merge(m.data,templateData),
          {data: {_file: file, _templatePath: templatePath}}
        ));
        cb(null,file);
      })))
      .pipe(through.obj(function(file,enc,cb) {
        totalCount = totalCount + 1;
        readable.emit('data',file);
        cb(null,file);
      }));
      s.on('data',function(){});
      s.on('end',function(err) {
        if (lastTotalCount === totalCount) {
          readable.emit('end');
          streamCb();
        }
        else {
          var paths = _.invokeMap(
            self.particleLoader.processablePaths(),
            function() {
              return this+"?(.hbs)";
            }
          );

          lastTotalCount = totalCount;
          runStreams(paths,{base:self.options.root});
        }
      });
    };

    runStreams(
      [
        "particles/cftemplates/**/*.json",
        "particles/cftemplates/**/*.template",
        "particles/cftemplates/**/*.hbs"
      ],
      {cwd:self.options.root,base:self.options.root}
    );

  });


  var parseTemplate = through.obj(function(file,enc,cb) {
    var error;
    if (file.isNull()) {
      //Do Nothing for now
    }
    else {
      try {
        var formatted = JSON.stringify(JSON.parse(file.contents.toString()), null, 2);
        file.contents = new Buffer(formatted);
      }
      catch(e) {
        e.message = "File " + file.path + " is not valid JSON. " + e.message;
        fs.outputFileSync(path.join('condensation_errors',file.path),file.contents);
        error = new gutil.PluginError('build',e);
      }
    }
    cb(error,file);
  });

  var doValidate = function(file) {
    return (file.path.match(/cftemplates[\/\\]/) && (process.env.FORCE_VALIDATE || s3opts.validate))
  }

  stream = stream
  .pipe(gulpif(/\.hbs$/,rename({extname:""})))
  .pipe(gulpif(/cftemplates[\/\\]/,parseTemplate))
  .pipe(gulpif(doValidate,cfValidate({region: s3opts.aws.region})))
  .pipe(gulp.dest(distPath))

  return stream;
};
