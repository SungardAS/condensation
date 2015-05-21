var _ = require('lodash'),
AWS = require('aws-sdk'),
cfValidate = require('./lib/gulp-cf-validate'),
cutil = require('./lib/util'),
rimraf = require('rimraf'),
es = require('event-stream'),
fs = require('fs-extra'),
cache = require('gulp-cached'),
gulpif = require('gulp-if'),
gutil = require('gulp-util'),
Handlebars = require('handlebars'),
jsonlint = require('gulp-jsonlint'),
lazypipe = require('lazypipe'),
matter = require('gray-matter'),
merge = require('merge-stream'),
ParticleLoader = require('./lib/particle-loader'),
path = require('path'),
rename = require('gulp-rename'),

through = require('through2');
url = require('url');

var DEFAULT_S3_PREFIX = exports.DEFAULT_S3_PREFIX = '';
var DEFAULT_TASK_PREFIX = exports.DEFAULT_TASK_PREFIX = 'condensation';
var PARTICLES_DIR = exports.PARTICLES_DIR = 'particles';
var DEFAULT_ROOT = exports.DEFAULT_ROOT = './';

var Condensation = function(gulp,options) {
  this.gulp = gulp;
  this.handlebars = Handlebars.create();
  this.options = _.merge({
    s3: [],
    dist: 'dist',
    root: DEFAULT_ROOT,
    dependencySrc: [],
    taskPrefix: DEFAULT_TASK_PREFIX
  },options);
  this.options.projectFullPath = path.join(process.cwd(),this.options.root);
  this.options.particlesDir = path.join(this.options.root,PARTICLES_DIR);

  if (!this.options.projectName) {
    try { this.options.projectName = require(path.join(process.cwd(),'package.json')).name; } catch(e) {}
  }

  this.particleLoader = new ParticleLoader({
    root: this.options.root
  });
  this.genTaskName = cutil.genTaskNameFunc({prefix:this.options.taskPrefix});
  this.condense();
};


Condensation.prototype.condense = function() {
  var self = this;
  var options = this.options;

  var gulp = this.gulp || require('gulp');

  var helpers = require('./lib/template-helpers')({
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

    var templateData = {};
    var s3 = new AWS.S3({region: s3opts.aws.region});
    var genDistPath = cutil.genDistPathFunc({
      id: i.toString(),
      s3prefix: s3opts.prefix,
      root: options.dist
    });

    templateData.s3 = s3opts.aws;

    var awsPath = s3.endpoint.href + s3opts.aws.bucket + "/" + s3opts.prefix;
    if(awsPath.indexOf('/', awsPath.length-1) == -1){
        awsPath += '/';
    }
    templateData.s3.awsPath = awsPath;
    templateData.s3.awsPathInS3Format = "s3://" + s3opts.aws.bucket + "/" + s3opts.prefix + "/";

    gulp.task(self.genTaskName('build',i),[self.genTaskName('clean:errors')],function() {


      var stream = es.readable(function(esCount,streamCb) {
        var readable = this;

        var totalCount = 0;
        var lastTotalCount = 0;

        var runStreams = function(globs,options) {
          var s = gulp.src(globs,options)
          .pipe(cache(self.options.projectName+i))
          .pipe(gulpif(/\.hbs$/,through.obj(function(file,enc,cb) {
            var m = matter(file.contents.toString());
            var fn = self.handlebars.compile(m.content);
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
              var paths = _.invoke(
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

        runStreams(["particles/cftemplates/**"],{cwd:self.options.root,base:self.options.root});
      });


      var templateChannel = lazypipe()
      .pipe(jsonlint)
      .pipe(function() {
        return jsonlint.reporter(function(file){
          gutil.log('File ' + file.path + ' is not valid JSON.');
          fs.outputFileSync(path.join('condensation_errors',file.path),file.contents);
        })
      })
      .pipe(function() {
        return through.obj(function(file,enc,cb) {
            if (file.isNull()) {
            }
            else {
              var formatted = JSON.stringify(JSON.parse(file.contents.toString()), null, 2);
              file.contents = new Buffer(formatted);
            }
            cb(null,file);
        });
      })
      .pipe(function() {
        return gulpif(
          s3opts.validate,
          cfValidate({region: s3opts.aws.region})
        )
      });

      stream = stream
      .pipe(gulpif(/\.hbs$/,rename({extname:""})))
      .pipe(gulpif(/cftemplates[\/\\]/,templateChannel()))
      .pipe(gulp.dest(genDistPath()));

      return stream;

    });

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

module.exports.buildTasks = function(gulp,options) {
  return new Condensation(gulp,options);
};
