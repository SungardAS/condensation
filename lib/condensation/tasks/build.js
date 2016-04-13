var _ = require('lodash'),
cache = require('gulp-cached'),
cfValidate = require('../../gulp-plugins/gulp-cf-validate'),
es = require('event-stream'),
fs = require('fs-extra'),
gulp = require('gulp'),
gulpif = require('gulp-if'),
gutil = require('gulp-util'),
jsonlint = require('gulp-jsonlint'),
lazypipe = require('lazypipe'),
matter = require('gray-matter'),
path = require('path'),
rename = require('gulp-rename'),
through = require('through2'),
url = require('url');


module.exports = function(s3opts,distPath,awsS3) {
  var self = this;

  var templateData = {};

  templateData.s3 = s3opts.aws;
  templateData.s3.prefix = s3opts.prefix;
  var urlString = [awsS3.endpoint.href,path.posix.join(s3opts.aws.bucket,s3opts.prefix)].join('');
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
        file.contents = new Buffer(fn(_.merge(m.data,templateData),{data: {_file: file}}));
        cb(null,file);
      })))
      .pipe(through.obj(function(file,enc,cb) {
        totalCount = totalCount + 1;
        readable.emit('data',file);
        cb(null,file);
      }));
      s.on('data',function(){});
      s.on('end',function() {
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


  var templateChannel = lazypipe()
  .pipe(jsonlint)
  .pipe(function() {
    return jsonlint.reporter(function(file){
      gutil.log('File ' + file.path + ' is not valid JSON.');
      fs.outputFileSync(path.join('condensation_errors',file.path),file.contents);
    });
  })
  .pipe(function() {
    return through.obj(function(file,enc,cb) {
      if (file.isNull()) {
        //Do Nothing for now
      }
      else {
        var formatted = JSON.stringify(JSON.parse(file.contents.toString()), null, 2);
        file.contents = new Buffer(formatted);
      }
      cb(null,file);
    });
  })
  .pipe(function() {
    var doValidate = (process.env.FORCE_VALIDATE || s3opts.validate) ? true : false;
    return gulpif(
      doValidate,
      cfValidate({region: s3opts.aws.region})
    );
  });

  stream = stream
  .pipe(gulpif(/\.hbs$/,rename({extname:""})))
  .pipe(gulpif(/cftemplates[\/\\]/,templateChannel()))
  .pipe(gulp.dest(distPath));

  return stream;
};
