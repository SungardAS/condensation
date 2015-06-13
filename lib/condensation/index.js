var _ = require('lodash'),
AWS = require('aws-sdk'),
cutil = require('./util'),
rimraf = require('rimraf'),
fs = require('fs-extra'),
gutil = require('gulp-util'),
Handlebars = require('handlebars'),
merge = require('merge-stream'),
path = require('path'),
ParticleLoader = require('./loaders/particle-loader'),
taskBuild = require('./tasks/build');
through = require('through2'),
url = require('url');

var Condensation = function(gulp,options) {
  this.gulp = gulp;
  this.handlebars = Handlebars.create();
  this.options = _.merge({
    s3: [],
    dist: 'dist',
    root: Condensation.DEFAULT_ROOT,
    dependencySrc: [],
    taskPrefix: Condensation.DEFAULT_TASK_PREFIX
  },options);
  this.options.projectFullPath = path.join(process.cwd(),this.options.root);
  this.options.particlesDir = path.join(this.options.root,Condensation.PARTICLES_DIR);

  if (!this.options.projectName) {
    try { this.options.projectName = require(path.join(process.cwd(),'package.json')).name; } catch(e) {}
  }

  this.particleLoader = new ParticleLoader({
    root: this.options.root
  });
  this.genTaskName = cutil.genTaskNameFunc({prefix:this.options.taskPrefix});
  this.condense();
};
Condensation.DEFAULT_S3_PREFIX = '';
Condensation.DEFAULT_TASK_PREFIX = 'condensation';
Condensation.PARTICLES_DIR = 'particles';
Condensation.DEFAULT_ROOT = './';


Condensation.prototype.condense = function() {
  var self = this;
  var options = this.options;

  var gulp = this.gulp || require('gulp');

  var helpers = require('./loaders/all-helpers')({
      particleLoader: this.particleLoader,
      handlebars: this.handlebars
  });

  var buildTasks = [];
  var deployTasks = [];
  var labelTasks = {};

  var s3config = options.s3 || [];


  _.each(s3config, function(s3opts,i) {
    s3opts = _.merge({
      prefix: '',
      labels: []
    },s3opts);

    var s3 = new AWS.S3({region: s3opts.aws.region});

    gulp.task(self.genTaskName('build',i),[self.genTaskName('clean:errors')],taskBuild.bind(self,gulp,s3opts,i,s3));
    buildTasks.push(self.genTaskName('build',i));

    // Ensure the bucket(s) defined in the config exist
    gulp.task(self.genTaskName('s3','bucket','ensure',i),function(cb) {
      s3.headBucket({
        Bucket: s3opts.aws.bucket
      },function(err,response){
        if (err && err.code === 'NotFound' && s3opts.create) {
          s3.createBucket({
            Bucket: s3opts.aws.bucket
          },cb);
        }
        else {
          cb(null,response);
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
            },function(err,response) {
              if (err) {
                // TODO throw error
                console.warn(err,response);
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
    rimraf(options.dist, cb);
  });

  // Remove errors directory
  gulp.task(self.genTaskName('clean:errors'), function (cb) {
    rimraf('condensation_errors', cb);
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

module.exports = Condensation;
