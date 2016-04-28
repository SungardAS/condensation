var AWS = require('aws-sdk');
var _ = require('lodash');
var assert = require('assert');
var async = require('async');
var clone = require('clone');
var fs = require('fs');
var path = require('path');

exports.generateConfig = function(projectName,overrides) {
  var config = {
    tasks: [
      'build',
      'build:0',
      'clean',
      'default',
      'deploy',
      'deploy:0',
      's3:bucket:ensure:0',
      's3:list',
      's3:objects:write:0'
    ],
    distributionFiles: [],
    projectConfig: {
      s3: [
        {
          aws: {
            region: 'us-east-1',
            bucket: '',
          },
          validate: false,
          create: false
        }
      ],
      projectName: projectName,
      root: path.join('test','fixtures','projects',projectName),
      taskPrefix: '',
      dist: path.join('test','dist',projectName)
    }
  };
  return _.merge(config,overrides);
};

exports.shouldBehaveLikeAProject = function(options){
  var gulp = options.gulp;

  before('check for AWS credentials', function(cb) {
    var self = this;
    var awsCreds = new AWS.CredentialProviderChain();
    awsCreds.resolve(function(err) {
      if (!err) {
        process.env.FORCE_VALIDATE=true
      }
      cb();
    });
  });

  beforeEach('create new gulp object', function() {
    gulp = clone(require('gulp'));
    require('../../').buildTasks(
      gulp,
      options.projectConfig
    );
  });

  after('clean the project', function(done) {
    var afterGulp = clone(require('gulp'));
    require('../../').buildTasks(afterGulp,options.projectConfig);
    afterGulp.start('clean');
    afterGulp.on('stop',function(){
      fs.lstat(options.projectConfig.dist, function(err, stats) {
        assert(err);
        done();
      });
    });
  });


  options.tasks.forEach(function(task) {
    it('should have a task named \''+task+'\'', function(done){
      assert(_.indexOf(_.keys(gulp.tasks),task)>=0);
      done();
    });
  });



  it('should build the project', function(done){
    gulp.start('build');
    gulp.on('stop',function(){
      async.each(
        options.distributionFiles,
        function(file,cb) {
          fs.lstat(path.join(options.projectConfig.dist,file), function(err, stats) {
            assert.ifError(err);

            fs.readFile(path.join('test','fixtures','projects_output',options.projectConfig.projectName,file), function(err, validate) {
              assert.ifError(err);
              var source = fs.readFileSync(path.join(options.projectConfig.dist,file));
              var isJson = true;
              try {
                source = JSON.parse(source);
              }
              catch(e) {
                isJson = false;
              }

              if (isJson) {
                assert.deepEqual(source,JSON.parse(validate));
              }
              else {
                assert.equal(source.toString(),validate.toString());
              }
              cb();
            });
          });
        },
        done
      );
    });
  });

};
