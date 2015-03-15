var _ = require('lodash'),
clone = require('clone'),
assert = require('assert'),
fs = require('fs'),
gulp = clone(require('gulp'));

require('../').buildTasks(
  gulp,{
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
  projectName: 'projectB',
  particlesDir: 'test/projectB/particles',
  taskPrefix: '',
  dist: 'test/dist/pB',
  dependencySrc: [
    'test/projectB/fake_bower_components'
  ]
}
);

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

describe('projectB', function(){
  tasks.forEach(function(task) {
    it('should have a task named \''+task+'\'', function(done){
      assert(_.findIndex(_.keys(gulp.tasks),task));
      done();
    });
  });

  it('should build the project', function(done){
    gulp.start('build');
    gulp.on('stop',function(){done();});
  });

  it('should build projectA as a dependency', function(done){
    // Is it a directory?
    fs.lstat('test/dist/pB/0/projectA', function(err, stats) {
      if (!err && stats.isDirectory()) {
        done();
      }
      else {
        done(err);
      }
    });
  });
});
