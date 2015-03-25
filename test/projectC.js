var _ = require('lodash'),
clone = require('clone'),
assert = require('assert'),
fs = require('fs');

describe('projectC', function(){
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
        projectName: 'projectC',
        root: 'test/projectC',
        taskPrefix: '',
        dist: 'test/dist/pC',
        dependencySrc: [
          'test/projectC/fake_bower_components'
        ],
      }
    );
  });

  it('should build the project', function(done){
    gulp.start ('deps:compile:0');
    // TODO assert
    gulp.on('stop',function(){done();});
  });

});
