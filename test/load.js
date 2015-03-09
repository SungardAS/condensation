var gulp = require('gulp');
require('../').buildTasks(gulp);

var assert = require('assert'),
    _ = require('lodash');

describe('load', function(){
  it('should populate gulp tasks with correct prefix', function(done){
    assert(_.keys(gulp.tasks).length);
    _.each(_.keys(gulp.tasks),function(taskName) {
      assert(taskName.match(/^condensation:/));
    });
    done();
  });
});

