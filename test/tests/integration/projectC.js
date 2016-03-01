var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
assert = require('assert'),
path = require('path'),
exec = require('child_process').exec;
shared = require('./project-shared'),
fs = require('fs');

var projectDir = 'test/fixtures/projects/projectC';
var distDir = 'test/dist/pC';

var distributionFiles = [
  'particles/cftemplates/proj.template',
  'node_modules/projectB/particles/assets/bootstrap.sh',
  'node_modules/projectB/particles/assets/download.sh',
  'node_modules/projectB/node_modules/projectA/particles/cftemplates/vpc.template'
];

describe('projectC', function(){
  var gulp;

  before(function(done) {
    var pB = exec("npm link ../projectB",{cwd: projectDir},done);
  });

  after(function(done) {
    var pB = exec("npm unlink ../projectB",{cwd: projectDir},done);
  });

  shared.shouldBehaveLikeAProject({
    gulp: gulp,
    tasks: [],
    distributionFiles: distributionFiles,
    projectConfig: {
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
        root: projectDir,
        taskPrefix: '',
        dist: distDir
      }
  });

});
