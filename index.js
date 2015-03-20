var _ = require('lodash'),
AWS = require('aws-sdk'),
cfValidate = require('./lib/gulp-cf-validate'),
cutil = require('./lib/util'),
del = require('del'),
gulpif = require('gulp-if'),
gutil = require('gulp-util'),
handlebars = require('gulp-compile-handlebars'),
jsonlint = require('gulp-jsonlint'),
merge = require('merge-stream'),
path = require('path'),
rename = require('gulp-rename'),
saveOrigPath = require('./lib/gulp-save-path'),
through = require('through2');

var DEFAULT_S3_PREFIX = exports.DEFAULT_S3_PREFIX = '';
var DEFAULT_TASK_PREFIX = exports.DEFAULT_TASK_PREFIX = 'condensation';
var PARTICLES_DIR = exports.PARTICLES_DIR = 'particles';
var DEFAULT_ROOT = exports.DEFAULT_ROOT = './';

var Condensation = function(gulp,options) {
  this.gulp = gulp;
  this.options = options = _.merge({
    s3: [],
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

  var partials = {};
  var helpers = {};
  var helpers = {};
  var buildTasks = [];
  var deployTasks = [];
  var labelTasks = {};

  var s3config = options.s3 || [];

  _.each(s3config, function(s3opts,i) {
    s3opts = _.merge({
      labels: []
    },s3opts);

    var templateData = {};
    var s3 = new AWS.S3({region: s3opts.aws.region});
    var genDistPath = cutil.genDistPathFunc({
      id: i.toString(),
      s3prefix: s3opts.prefix,
      root: options.dist
    });


    templateData.s3 = s3opts.aws;
    templateData.s3.awsPath = s3.endpoint.href+s3opts.aws.bucket;

    gulp.task(self.genTaskName('assets','compile',i),[self.genTaskName('partials','load'),self.genTaskName('helpers','load')],function() {
      var mergeStreams = self._buildDepParticleStreams('assets',true);

      var stream = merge.apply(null,mergeStreams).add(gulp.src(["assets/**"],{cwd:options.particlesDir}))
      .pipe(gulpif(/\.hbs$/,handlebars(templateData,{partials:partials,helpers:helpers})))
      .pipe(gulpif(/\.hbs$/,rename({extname:""})))
      .pipe(rename({dirname:path.join.apply(null,_.compact([options.projectName,"assets"]))}));

      return stream.pipe(
        gulp.dest(genDistPath())
      );

    });

    // Compile all templates with handlebars
    gulp.task(self.genTaskName('templates','compile',i),[self.genTaskName('partials','load'),self.genTaskName('helpers','load')],function() {
      var mergeStreams = self._buildDepParticleStreams('cftemplates',true);

      // source project
      var spStream = gulp.src(["cftemplates/**"],{cwd:options.particlesDir})
      .pipe(rename({dirname: path.join(options.projectName,'cftemplates')}));
      mergeStreams.push(spStream);

      var stream = merge.apply(null,mergeStreams)
      .pipe(gulpif(/\.hbs$/,handlebars(templateData,{partials:partials,helpers:helpers})))
      .pipe(gulpif(/\.hbs$/,rename({extname:""})))
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());

      if (s3opts.validate) {
        stream = stream.pipe(cfValidate({region: s3opts.aws.region}));
      }

      return stream.pipe(
        gulp.dest(genDistPath())
       );
    });

    // set build tasks
    gulp.task(self.genTaskName('build',i), [self.genTaskName('assets','compile',i),self.genTaskName('templates','compile',i)]);
    buildTasks.push(self.genTaskName('build',i));


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
    gulp.task(
      self.genTaskName('s3','objects','write',i),
      [
        self.genTaskName('s3','bucket','ensure',i),
        self.genTaskName('build',i)
      ],
      function() {
      var streams = [];
      _.each([path.join(options.dist,i.toString()),path.join(options.dist,'shared')],function(srcDir) {
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

    gulp.task(self.genTaskName('deploy',i),[self.genTaskName('s3','objects','write',i)]);
    deployTasks.push(self.genTaskName('deploy',i));

    _.each(s3opts.labels,function(label) {
      labelTasks[label] = labelTasks[label] || {
        buildTasks: [],
        deployTasks: []
      };
      labelTasks[label].buildTasks.push(self.genTaskName('build',i));
      labelTasks[label].deployTasks.push(self.genTaskName('deploy',i));
    });

  });

  // Remove all files from 'dist'
  gulp.task(self.genTaskName('clean'), function (cb) {
    del([
      options.dist
    ], cb);
  });

  // Register all partials for use with templates
  gulp.task(self.genTaskName('partials','load'),function(cb) {
    var mergeStreams = self._buildDepParticleStreams('partials',false);

    return merge.apply(null,mergeStreams).add(gulp.src("partials/**",{cwd:self.options.particlesDir}))
    .pipe(through.obj(function(file, enc, cb) {
      if (file.contents) {
        partials[file.relative.replace(/\.hbs$/,"")] = file.contents.toString();
      }
      cb(null,file);
    }));
  });

  // Register all helpers
  // TODO try to set read:false for all streams?
  gulp.task(self.genTaskName('helpers','load'),function(cb) {
    var mergeStreams = self._buildDepParticleStreams('helpers',false,false);

    var localStream = gulp.src(path.join("helpers","**"),{cwd:self.options.particlesDir})
    .pipe(saveOrigPath())
    .pipe(rename({dirname: options.projectName}));

    return merge.apply(null,mergeStreams).add(localStream)
    .pipe(through.obj(function(file, enc, cb) {
      if (path.extname(file._origPath) == '.js') {
        helpers[file.relative.replace('/','-').replace(/\.js$/,'')] = require(file._origPath);
      }
      cb(null,file);
    }));
  });

  gulp.task(self.genTaskName('s3','list'), function(cb) {
    _.each(s3config, function(s3opts,i) {
      gutil.log(i + ": " + s3opts.aws.bucket);
    });
    cb();
  });


  // Tasks to launch other tasks
  gulp.task(self.genTaskName('build'),buildTasks);
  gulp.task(self.genTaskName('deploy'), deployTasks);
  gulp.task(self.genTaskName('default'),[self.genTaskName('build')]);
  _.each(_.pairs(labelTasks),function(kv) {
    gulp.task(self.genTaskName('build',kv[0]),kv[1].buildTasks);
    gulp.task(self.genTaskName('deploy',kv[0]),kv[1].deployTasks);
  });

};

Condensation.prototype._buildDepParticleStreams = function(particle,incParticleInPath,incProjectInPath) {
  var gulp = this.gulp;

  var streams = [];
  _.each(this.options.dependencySrc,function(dir) {
    var depSrc = gulp.src([path.join("*",'particles',particle,"**")],{cwd:dir})
    .pipe(saveOrigPath())
    .pipe(rename(function(path) {
      if (!incProjectInPath) {
        path.dirname = path.dirname.replace(new RegExp("/"+PARTICLES_DIR+"/?"),'/');
      }
      if (!incParticleInPath) {
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
