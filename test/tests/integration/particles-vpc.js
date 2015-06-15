var _ = require('lodash'),
async = require('async'),
clone = require('clone'),
exec = require('child_process').exec,
assert = require('assert'),
path = require('path'),
shared = require('./project-shared'),
fs = require('fs');

var projectDir = 'test/fixtures/projects/particles-vpc';
var distDir = 'test/dist/particles-vpc';

describe('particles-vpc', function(){
  var gulp;

  before(function(done) {
    var p = exec("npm link ../particles-common-core",{cwd: projectDir},done);
  });

  after(function(done) {
    var p = exec("npm unlink ../particles-common-core",{cwd: projectDir},done);
  });

  shared.shouldBehaveLikeAProject({
    gulp: gulp,
    tasks: [],
    distributionFiles: [],
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
        projectName: 'particles-vpc',
        root: projectDir,
        taskPrefix: '',
        dist: distDir
      }
  });

});
