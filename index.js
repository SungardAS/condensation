var _ = require('lodash'),
AWS = require('aws-sdk'),
async = require('async'),
cfValidate = require('./lib/gulp-cf-validate'),
cutil = require('./lib/util'),
del = require('del'),
gulpif = require('gulp-if'),
gutil = require('gulp-util'),
gzip = require('gulp-gzip'),
handlebars = require('gulp-compile-handlebars'),
jsonlint = require('gulp-jsonlint'),
merge = require('merge-stream'),
path = require('path'),
rename = require('gulp-rename'),
tar = require('gulp-tar'),
through = require('through2');

var DEFAULT_TASK_PREFIX = exports.DEFAULT_TASK_PREFIX = 'condensation';
var PARTICLES_DIR = exports.PARTICLES_DIR = 'particles';
var DEFAULT_ROOT = exports.DEFAULT_ROOT = './';

var Condensation = function(gulp,options) {
  this.options = options = options || {};
  this.gulp = gulp;
  options = _.merge({
    dist: 'dist',
    root: DEFAULT_ROOT,
    dependencySrc: [],
    taskPrefix: DEFAULT_TASK_PREFIX
  },options);
  options.particlesDir = path.join(options.root,PARTICLES_DIR);

  if (!options.projectName) {
    try { options.projectName = require(process.cwd()+'/bower.json').name; } catch(e) {}
  }

  this.genTaskName = cutil.genTaskNameFunc({prefix:options.taskPrefix});
  this.condense();
};


Condensation.prototype.condense = function() {
  var self = this;
  var options = this.options;

  var gulp = this.gulp || require('gulp');
  var runSequence = require('run-sequence').use(gulp);

  var partials = {};
  var templateCompileTasks = [];
  var s3objectsWriteTasks = [];
  var deployTasks = [];

  var s3config = options.s3 || [];

  _.each(s3config, function(s3opts,i) {
    var templateData = {};
    var s3 = new AWS.S3({region: s3opts.aws.region});

    templateData.s3 = s3opts.aws;
    templateData.s3.awsPath = s3.endpoint.href+s3opts.aws.bucket;

    gulp.task(self.genTaskName('assets','compile',i),[self.genTaskName('partials','load')],function() {
      var mergeStreams = self._buildDepParticleStreams('assets',true);

      var stream = merge.apply(mergeStreams).add(gulp.src(["assets/**"],{cwd:options.particlesDir}))
      .pipe(gulpif(/\.hbs$/,handlebars(templateData,{partials:partials})))
      .pipe(gulpif(/\.hbs$/,rename({extname:""})))
      .pipe(rename({dirname:path.join.apply(null,_.compact([options.projectName,"assets"]))}));

      return stream.pipe(gulp.dest(path.join(options.dist,i.toString())));
    });

    // Compile all templates with handlebars
    gulp.task(self.genTaskName('templates','compile',i),[self.genTaskName('assets','compile',i)],function() {
      var mergeStreams = self._buildDepParticleStreams('cftemplates',false);

      // source project
      var spStream = gulp.src(["cftemplates/**"],{cwd:options.particlesDir})
      .pipe(rename({dirname: options.projectName}));
      mergeStreams.push(spStream);

      var stream = merge.apply(null,mergeStreams)
      .pipe(gulpif(/\.hbs$/,handlebars(templateData,{partials:partials})))
      .pipe(gulpif(/\.hbs$/,rename({extname:""})))
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());

      if (s3opts.validate) {
        stream = stream.pipe(cfValidate({region: s3opts.aws.region}));
      }

      return stream.pipe(gulp.dest(path.join(options.dist,i.toString())));
    });
    templateCompileTasks.push(self.genTaskName('templates','compile',i));


    // Ensure the bucket(s) defined in the config exist
    gulp.task(self.genTaskName('s3','bucket','ensure',i),function(cb) {
      s3.headBucket({
        Bucket: s3opts.aws.bucket
      },function(err,data){
        if (err && err.code === 'NotFound' && s3opts.create) {
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
    gulp.task(self.genTaskName('s3','objects','write',i),[self.genTaskName('s3','bucket','ensure',i)],function() {
      var streams = [];
      _.each([path.join(options.dist,i),path.join(options.dist,'shared')],function(srcDir) {
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
              if (err) {
                // TODO throw error
                console.warn(err);
              }
            });
          }
        });
        streams.push(stream);
      });
      return merge.apply(null,streams);
    });
    s3objectsWriteTasks.push(self.genTaskName('s3','objects','write',i));

    gulp.task(self.genTaskName('build',i), function(cb) {
      runSequence(self.genTaskName('partials','load'),self.genTaskName('templates','compile',i),cb);
    });

  });

  _.each(s3objectsWriteTasks,function(wt,i) {
    gulp.task(self.genTaskName('deploy',i),[self.genTaskName('build',i),wt]);
    deployTasks.push(self.genTaskName('deploy',i));
  });


  // Remove all files from 'dist'
  gulp.task(self.genTaskName('clean'), function (cb) {
    del([
      options.dist
    ], cb);
  });

  // Register all partials for use with templates
  gulp.task(self.genTaskName('partials','load'),function(cb) {
    var mergeStreams = self._buildDepParticleStreams('partials',true);

    return merge.apply(mergeStreams).add(gulp.src("partials/**",{cwd:self.options.particlesDir}))
    .pipe(through.obj(function(file, enc, cb) {
      if (file.contents) {
        partials[file.relative.replace(/\.hbs$/,"")] = file.contents.toString();
      }
      cb(null,file);
    }));
  });

  // For any directory within an 'assets' directory that
  // ends in _pkg create a gziped tar of its contents
  //
  // TODO Revisit
  //gulp.task(self.genTaskName(+"assets:package",function(cb) {

    ////The returns here may not be right
    //return gulp.src("**/assets/*_pkg",{cwd:"src"}).on("data",function(dir){
       //if (dir.stat.isDirectory()) {
         //return gulp.src(dir.path+"/*")
         //.pipe(tar(dir.relative+".tar"))
         //.pipe(gzip())
         //.pipe(gulp.dest('./dist/shared'));
       //}
     //});
   //});

  gulp.task(self.genTaskName('s3','list'), function(cb) {
    _.each(s3config, function(s3opts,i) {
      gutil.log(i + ": " + s3opts.aws.bucket);
    });
    cb();
  });

  gulp.task(self.genTaskName('build'), function(cb) {
    // TODO Revisit assets:package
    //runSequence(self.genTaskName(+"partials:load",[].concat(templateCompileTasks),self.genTaskName(+"assets:package",cb);
    runSequence(self.genTaskName('partials','load'),[].concat(templateCompileTasks),cb);
  });

  // Tasks exists only to launch other tasks
  gulp.task(self.genTaskName('deploy'), deployTasks, function(cb) {
    cb();
  });

  gulp.task(self.genTaskName('default'),[self.genTaskName('build')]);

};

Condensation.prototype._buildDepParticleStreams = function(particle,incParticleInPath) {
  var gulp = this.gulp;

  var streams = [];
  _.each(this.options.dependencySrc,function(dir) {
    var depSrc = gulp.src([path.join("*",'particles',particle,"**")],{cwd:dir})
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace(new RegExp("/"+PARTICLES_DIR+"/?"),'/');
      if (incParticleInPath === false) {
        path.basename = path.basename.replace(new RegExp(particle),'');
        path.dirname = path.dirname.replace(new RegExp("/"+particle+"/?"),'/');
      }
    }));
    streams.push(depSrc);
  });
  return streams;
};

module.exports.buildTasks = function(gulp,options) {
  return new Condensation(gulp,options);
};
