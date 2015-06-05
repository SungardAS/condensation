var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
fs = require('fs');


var tasks = [
  'build',
  'build:0',
  'clean',
  'default',
  'deploy',
  'deploy:0',
  's3:bucket:ensure:0',
  's3:list',
  's3:objects:write:0'
];

var distributionFiles = [
  'particles/cftemplates/vpc.template',
  'particles/cftemplates/subnet.template',
  'particles/cftemplates/infra.template'
];


describe('projectA', function(){
  var gulp;

  beforeEach(function() {
    gulp = clone(require('gulp'));
    require('../../../').buildTasks(
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
        root: 'test/fixtures/projectA',
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
    gulp.on('stop',function(){
      async.each(
        distributionFiles,
        function(file,cb) {
          fs.lstat(path.join('test/dist/pA/0',file), function(err, stats) {
            cb(err);
          });
        },
        done
      );
    });
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
