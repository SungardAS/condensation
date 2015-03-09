var _ = require('lodash'),
AWS = require('aws-sdk'),
async = require('async'),
cfValidate = require('./lib/gulp-cf-validate'),
config = require('config'),
del = require('del'),
gulpif = require('gulp-if'),
gzip = require('gulp-gzip'),
handlebars = require('gulp-compile-handlebars'),
jsonlint = require('gulp-jsonlint'),
merge = require('merge-stream'),
rename = require('gulp-rename'),
tar = require('gulp-tar'),
through = require('through2');

var DEFAULT_TASK_PREFIX = 'condensation';


var condensation = function(globalGulp,options) {
  options = options || {};

  var gulp = globalGulp || require('gulp');
  var runSequence = require('run-sequence').use(gulp);

  var partials = {};
  var templateCompileTasks = [];
  var s3objectsWriteTasks = [];
  var deployTasks = [];

  var s3config = [];

  var taskPrefix = DEFAULT_TASK_PREFIX;
  if (options.taskPrefix === '') {
    taskPrefix = options.taskPrefix;
  }
  if (taskPrefix.length > 0) {
    taskPrefix = taskPrefix + ':';
  }

  if (config.has('s3')) {
    s3config = config.get('s3');
  }

  _.each(s3config, function(s3opts,i) {
    var templateData = {};
    var s3 = new AWS.S3({region: s3opts.aws.region});

    templateData.s3 = s3opts.aws;
    templateData.s3.awsPath = s3.endpoint.href+s3opts.aws.bucket;

    gulp.task(taskPrefix + "assets:compile:"+i,[taskPrefix+'partials:load'],function() {
      var stream = gulp.src(["**/assets/**"],{cwd:"src"})
      .pipe(gulpif(/\.hbs$/,handlebars(templateData,{partials:partials})))
      .pipe(gulpif(/\.hbs$/,rename({extname:""})));

      return stream.pipe(gulp.dest('./dist/'+i));
    });

    // Compile all templates with handlebars
    gulp.task(taskPrefix + "templates:compile:"+i,[taskPrefix+"assets:compile:"+i],function() {
      var stream = gulp.src(["**/cftemplates/*"],{cwd:"src"})
      .pipe(handlebars(templateData,{partials:partials}))
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());

      if (s3opts.validate) {
        stream = stream.pipe(cfValidate({region: s3opts.aws.region}));
      }

      return stream.pipe(gulp.dest('./dist/'+i));
    });
    templateCompileTasks.push(taskPrefix + "templates:compile:"+i);


    // Ensure the bucket(s) defined in the config exist
    gulp.task(taskPrefix + "s3:bucket:ensure:"+i,function(cb) {
      s3.headBucket({
        Bucket: s3opts.aws.bucket
      },function(err,data){
        if (err && err.code == 'NotFound' && s3opts.create) {
          s3.createBucket({
            Bucket: s3opts.aws.bucket
          },cb);
        }
        else {
          cb(null,data);
          //TODO Removed for cross account access.  Need to revisit s3 bucket permissions and correct fallback
          // cb(err,data);
        }
      });
    });


    // Write objects to s3
    gulp.task(taskPrefix + "s3:objects:write:"+i,[taskPrefix+"s3:bucket:ensure:"+i],function() {
      var streams = [];
      _.each(["./dist/"+i,"./dist/shared"],function(srcDir) {
        var stream = gulp.src("**",{cwd:srcDir}).on("data",function(file) {
          if (file.stat.isFile()) {
            var newFilename = file.relative;

            s3.putObject({
              Bucket: s3opts.aws.bucket,
              ACL: "bucket-owner-full-control",
              //ACL: "private",
              Key: newFilename,
              Body: file.contents
            },function(err,data) {
              if (err) console.log(err);
            });
          }
        });
        streams.push(stream);
      });
      return merge.apply(null,streams);
    });
    s3objectsWriteTasks.push(taskPrefix+"s3:objects:write:"+i);

    gulp.task(taskPrefix+'build:'+i, function(cb) {
      runSequence(taskPrefix+"partials:load",taskPrefix+"templates:compile:"+i,taskPrefix+"assets:package",cb);
    });

  });

  _.each(s3objectsWriteTasks,function(wt,i) {
    gulp.task(taskPrefix+"deploy:"+i,[taskPrefix+"build:"+i,wt]);
    deployTasks.push(taskPrefix+"deploy:"+i);
  });


  // Remove all files from 'dist'
  gulp.task(taskPrefix+'clean', function (cb) {
    del([
      'dist/**'
    ], cb);
  });


  // Register all partials for use with templates
  gulp.task(taskPrefix+"partials:load",function(cb) {
    return gulp.src("**/partials/**",{cwd:"src"})
    .pipe(through.obj(function(file, enc, cb) {
      if (file.contents) {
        partials[file.relative.replace(/\.hbs$/,"")] = file.contents.toString();
      }
      cb(null,file);
    }));
  });

  // For any directory within an 'assets' directory that
  // ends in _pkg create a gziped tar of its contents
  gulp.task(taskPrefix+"assets:package",function(cb) {

    //The returns here may not be right
    return gulp.src("**/assets/*_pkg",{cwd:"src"}).on("data",function(dir){
      if (dir.stat.isDirectory()) {
        return gulp.src(dir.path+"/*")
        .pipe(tar(dir.relative+".tar"))
        .pipe(gzip())
        .pipe(gulp.dest('./dist/shared'));
      }
    });
  });



  gulp.task(taskPrefix+'s3:list', function(cb) {
    _.each(s3config, function(s3opts,i) {
      console.log(i + ": " + s3opts.aws.bucket);
    });
    cb();
  });

  gulp.task(taskPrefix+'build', function(cb) {
    runSequence(taskPrefix+"partials:load",[].concat(templateCompileTasks),taskPrefix+"assets:package",cb);
  });

  gulp.task(taskPrefix+'deploy', deployTasks, function(cb) {
    cb();
    // runSequence(taskPrefix+"build",s3objectsWriteTasks,cb);
  });

  gulp.task(taskPrefix+"default",[taskPrefix+"build"]);

};

module.exports = condensation;
