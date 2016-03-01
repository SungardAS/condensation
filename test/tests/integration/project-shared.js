var _ = require('lodash'),
AWS = require('aws-sdk'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
fs = require('fs');

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
    require('../../../').buildTasks(
      gulp,
      options.projectConfig
    );
  });

  after('clean the project', function(done) {
    var afterGulp = clone(require('gulp'));
    require('../../../').buildTasks(afterGulp,options.projectConfig);
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
          fs.lstat(path.join(options.projectConfig.dist,'0',file), function(err, stats) {
            cb(err);
          });
        },
        done
      );
    });
  });

};
