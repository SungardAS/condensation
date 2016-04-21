var _ = require('lodash');
var assert = require('assert');
var clone = require('clone');
var fs = require('fs');
var path = require('path');
var shared = require('./project-shared');

describe.skip('invalid', function(){
  var gulp;

  var projectName = 'invalid';

  var config = shared.generateConfig(projectName, {gulp: gulp});

  beforeEach('create new gulp object', function() {
    gulp = clone(require('gulp'));
    require('../../').buildTasks(
      gulp,
      config.projectConfig
    );
  });

  after('clean the project', function(done) {
    var afterGulp = clone(require('gulp'));
    require('../../').buildTasks(afterGulp,config.projectConfig);
    afterGulp.start('clean');
    afterGulp.on('stop',function(){
      fs.lstat(config.projectConfig.dist, function(err, stats) {
        assert(err,config.projectConfig.dist + " not clean");
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
