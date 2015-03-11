var _ = require('lodash'),
assert = require('assert'),
gulp = require('gulp');

require('../').buildTasks(gulp);

describe('load', function(){
  it('should populate gulp tasks with correct prefix', function(done){
    assert(_.keys(gulp.tasks).length);
    _.each(_.keys(gulp.tasks),function(taskName) {
      assert(taskName.match(/^condensation:/));
    });
    done();
  });
});

