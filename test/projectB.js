var _ = require('lodash'),
clone = require('clone'),
assert = require('assert'),
fs = require('fs');

var tasks = [
  'build',
  'build:0',
  'build:east',
  'clean',
  'default',
  'deploy',
  'deploy:0',
  'deploy:east',
  's3:bucket:ensure:0',
  's3:list',
  's3:objects:write:0'
];

describe('projectB', function(){
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
              bucket: '',
            },
            labels: ['east'],
            validate: false,
            create: false
          }
        ],
        projectName: 'projectB',
        root: 'test/projectB',
        taskPrefix: '',
        dist: 'test/dist/pB',
        dependencySrc: [
          'test/projectB/fake_bower_components'
        ],
      }
    );
  });

  tasks.forEach(function(task) {
    it('should have a task named \''+task+'\'', function(done){
      assert(_.indexOf(_.keys(gulp.tasks),task)>=0);
      done();
    });
  });

  it('should build the project', function(done){
    gulp.start ('build');
    // TODO assert
    gulp.on('stop',function(){done();});
  });

  it('should clean the project', function(done){
    gulp.start('clean');
    gulp.on('stop',function(){
      fs.lstat('test/dist/pB', function(err, stats) {
        assert(err);
        done();
      });
    });
  });

});
