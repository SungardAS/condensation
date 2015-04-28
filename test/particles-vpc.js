var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
fs = require('fs');

describe('particles-vpc', function(){
  var gulp;

  beforeEach(function() {
    gulp = clone(require('gulp'));
    require('../').buildTasks(
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
        root: 'test/particles-vpc',
        taskPrefix: '',
        dist: 'test/dist/particles-vpc',
        dependencySrc: [
          'test/particles-vpc/fake_bower_components'
        ],
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
