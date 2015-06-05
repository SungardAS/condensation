var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
exec = require('child_process').exec,
assert = require('assert'),
path = require('path'),
fs = require('fs');

describe('particles-vpc', function(){
  var gulp;

   before(function(done) {
    var p = exec("npm link ../particles-common-core",{cwd: 'test/fixtures/particles-vpc'},done);
  });

  beforeEach(function() {
    gulp = clone(require('gulp'));
    require('../../../').buildTasks(
      gulp,
      {
        s3: [
          {
            aws: {
              region: 'us-east-1',
              bucket: 'my-test-bucket',
            },
            labels: ['east'],
            validate: false,
            create: false
          }
        ],
        projectName: 'particles-vpc',
        root: 'test/fixtures/particles-vpc',
        taskPrefix: '',
        dist: 'test/dist/particles-vpc'
      }
    );
  });

  it('should build the project', function(done){
    gulp.start('build');
    gulp.on('err',assert.fail);
    gulp.on('stop',function(){
      done();
    });
  });

  it('should clean the project', function(done){
    gulp.start('clean');
    gulp.on('stop',function(){
      fs.lstat('test/dist/particles-vpc', function(err, stats) {
        assert(err);
        done();
      });
    });
  });
});
