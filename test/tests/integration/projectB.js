var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
exec = require('child_process').exec,
shared = require('./project-shared'),
fs = require('fs');

var projectDir = 'test/fixtures/projects/projectB';
var distDir = 'test/dist/pB';

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

var distributionFiles = [
  'particles/cftemplates/instance.template.json',
  'particles/assets/bootstrap.sh',
  'particles/assets/download.sh',
  'node_modules/projectA/particles/cftemplates/vpc.template'
];

describe('projectB', function(){
  var gulp;

  before(function(done) {
    var pA = exec("npm link ../projectA",{cwd: projectDir},done);
  });

  after(function(done) {
    var pA = exec("npm unlink ../projectA",{cwd: projectDir},done);
  });

  shared.shouldBehaveLikeAProject({
    gulp: gulp,
    tasks: tasks,
    distributionFiles: distributionFiles,
    projectConfig: {
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
        root: projectDir,
        taskPrefix: '',
        dist: distDir
      }
  });

});
