var _ = require('lodash'),
  async = require('async'),
  clone = require('clone'),
  assert = require('assert'),
  path = require('path'),
  shared = require('./project-shared'),
  fs = require('fs');

var projectDir = 'test/fixtures/projects/invalid';
var distDir = 'test/dist/invalid';

var projectConfig = {
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
  projectName: 'invalid',
  root: projectDir,
  taskPrefix: '',
  dist: distDir,
};


describe('invalid', function(){
  var gulp;

  beforeEach('create new gulp object', function() {
    gulp = clone(require('gulp'));
    require('../../').buildTasks(
      gulp,
      projectConfig
    );
  });

  after('clean the project', function(done) {
    var afterGulp = clone(require('gulp'));
    require('../../').buildTasks(afterGulp,projectConfig);
    afterGulp.start('clean');
    afterGulp.on('stop',function(){
      fs.lstat(projectConfig.dist, function(err, stats) {
        assert(err,projectConfig.dist + " not clean");
        done();
      });
    });
  });

  it('should fail to build the project', function(done){
    gulp.start('build');

    gulp.on('err', function(err) {
      assert(err);
    });
    gulp.on('stop', function() {
      done();
    });

  });

});
