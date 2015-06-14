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
tasks = require('./tasks');
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

    var awsS3 = new AWS.S3({region: s3opts.aws.region});

    var distPath = cutil.genDistPath({
      id: i.toString(),
      s3prefix: s3opts.prefix,
      root: self.options.dist
    });

    // Build task
    gulp.task(
      self.genTaskName('build',i),
      [self.genTaskName('clean:errors')],
      tasks.build.bind(self,s3opts,distPath,awsS3)
    );
    buildTasks.push(self.genTaskName('build',i));


    // Ensure the bucket(s) defined in the config exist
    gulp.task(self.genTaskName('s3','bucket','ensure',i),tasks.s3.ensureBucket.bind(this,s3opts,awsS3));


    // Write objects to s3
    gulp.task(
      self.genTaskName('s3','objects','write',i),
      [
        self.genTaskName('s3','bucket','ensure',i),
        self.genTaskName('build',i)
      ],
      tasks.s3.writeObjects.bind(this,s3opts,awsS3,distPath)
    );

    // Deploy to s3 task
    gulp.task(self.genTaskName('deploy',i),[self.genTaskName('s3','objects','write',i)]);
    deployTasks.push(self.genTaskName('deploy',i));


    // Create build and deploy tasks for each label
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

  // List s3 buckets and their ID
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
