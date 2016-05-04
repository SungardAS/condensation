var AWS = require('aws-sdk');
var Handlebars = require('handlebars');
var ParticleLoader = require('./loaders/particle-loader');
var _ = require('lodash');
var cutil = require('./util');
var gutil = require('gulp-util');
var path = require('path');
var rimraf = require('rimraf');
var tasks = require('./tasks');
var through = require('through2');

var Condensation = function(gulp,options) {
  this.gulp = gulp || require('gulp');;
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

  this.helpers = require('./loaders/all-helpers')({
      particleLoader: this.particleLoader,
      handlebars: this.handlebars
  });

};
Condensation.DEFAULT_S3_PREFIX = '';
Condensation.DEFAULT_TASK_PREFIX = 'condensation';
Condensation.PARTICLES_DIR = 'particles';
Condensation.DEFAULT_ROOT = './';


Condensation.prototype.condense = function() {
  var self = this;
  var options = this.options;
  var gulp = this.gulp;

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
      [self.genTaskName('particle-modules:load'),self.genTaskName('clean:errors')],
      tasks.build.bind(self,s3opts,distPath,awsS3)
    );
    buildTasks.push(self.genTaskName('build',i));


    // Ensure the bucket(s) defined in the config exist
    gulp.task(self.genTaskName('s3','bucket','ensure',i),tasks.s3.ensureBucket.bind(this,s3opts,awsS3));


    // Write objects to s3
    var writeS3ObjectsDeps = [
      self.genTaskName('s3','bucket','ensure',i),
      self.genTaskName('build',i)
    ];

    if (s3opts.clean) {
      writeS3ObjectsDeps.push(self.genTaskName('s3','objects','delete',i));
    };
    gulp.task(
      self.genTaskName('s3','objects','write',i),
      writeS3ObjectsDeps,
      tasks.s3.writeObjects.bind(this,s3opts,awsS3,distPath)
    );

    // Delete objects from s3
    gulp.task(
      self.genTaskName('s3','objects','delete',i),
      [
        self.genTaskName('s3','bucket','ensure',i)
      ],
      tasks.s3.deleteObjects.bind(this,s3opts,awsS3)
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

  // Find all particle modules and init
  gulp.task(self.genTaskName('particle-modules:load'), function() {
    return gulp.src(['**/package.json'])
    .pipe(through.obj(function(file,enc,cb) {
      var packageJson = JSON.parse(file.contents);
      if (_.includes(packageJson.keywords,'condensation-particles')) {
        this.push(file);
      }
      cb();
    }))
    .pipe(through.obj(function(file,enc,cb) {
      var filePath = path.parse(file.path);
      var condensationJs;
      try {
        condensationJs = require(filePath.dir+'/condensation');
      }
      catch(e) {
        //do nothing
      }
      if (condensationJs) {
        condensationJs.initialize.apply(self,[cb]);
      }
      else {
        cb();
      }
    }))
    ;
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
      gutil.log(i + ": " + path.posix.join(s3opts.aws.bucket,s3opts.prefix));
    });
    cb();
  });


  // Tasks to launch other tasks
  gulp.task(self.genTaskName('build'),buildTasks);
  gulp.task(self.genTaskName('deploy'), deployTasks);
  gulp.task(self.genTaskName('default'),[self.genTaskName('build')]);
  _.each(_.toPairs(labelTasks),function(kv) {
    gulp.task(self.genTaskName('build',kv[0]),kv[1].buildTasks);
    gulp.task(self.genTaskName('deploy',kv[0]),kv[1].deployTasks);
  });

};

module.exports = Condensation;
