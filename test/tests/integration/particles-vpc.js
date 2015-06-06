var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
exec = require('child_process').exec,
assert = require('assert'),
path = require('path'),
fs = require('fs');

var projectDir = 'test/fixtures/projects/particles-vpc';
var distDir = 'test/dist/particles-vpc';

describe('particles-vpc', function(){
  var gulp;

   before(function(done) {
    var p = exec("npm link ../particles-common-core",{cwd: projectDir},done);
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
        root: projectDir,
        taskPrefix: '',
        dist: distDir
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
      fs.lstat(distDir, function(err, stats) {
        assert(err);
        done();
      });
    });
  });
});
