var _ = require('lodash'),
clone = require('clone'),
assert = require('assert'),
gulp = clone(require('gulp'));

require('../../../').buildTasks(gulp);

describe('load', function(done){
  it('should populate gulp tasks with correct prefix', function(tDone){
    assert(_.keys(gulp.tasks).length);
    _.each(_.keys(gulp.tasks),function(taskName) {
      assert(taskName.match(/^condensation:/));
    });
    tDone();
  });
});

