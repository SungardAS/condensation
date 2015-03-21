var _ = require('lodash'),
clone = require('clone'),
assert = require('assert'),
fs = require('fs');


var tasks = [
  'assets:compile:0',
  'build',
  'build:0',
  'clean',
  'default',
  'deploy',
  'deploy:0',
  'partials:load',
  's3:bucket:ensure:0',
  's3:list',
  's3:objects:write:0',
  'templates:compile:0'
];

describe('projectA', function(){
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
            validate: false,
            create: false
          }
        ],
        projectName: 'projectA',
        root: 'test/projectA',
        taskPrefix: '',
        dist: 'test/dist/pA',
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
    gulp.start('build');
    // TODO assert
    gulp.on('stop',function(){done();});
  });

  it('should clean the project', function(done){
    gulp.start('clean');
    gulp.on('stop',function(){
      fs.lstat('test/dist/pA', function(err, stats) {
        assert(err);
        done();
      });
    });
  });
});
