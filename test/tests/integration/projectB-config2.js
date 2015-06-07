var assert = require('assert'),
clone = require('clone'),
fs = require('fs'),
exec = require('child_process').exec,
path = require('path'),
shared = require('./project-shared'),
_ = require('lodash');

var projectDir = 'test/fixtures/projects/projectB';
var distDir = 'test/dist/pB-2';

var config = {
  s3: [
    {
      aws: {
        region: 'us-east-1',
        bucket: '',
      },
      validate: false,
      create: false,
      prefix: 'testing-path'
    }
  ],
  projectName: 'projectB-config2',
  root: projectDir,
  taskPrefix: '',
  dist: distDir
};

describe('projectB-config2', function(){
  var gulp;

  before(function(done) {
    var pA = exec("npm link ../projectA",{cwd: projectDir},done);
  });

  after(function(done) {
    var pA = exec("npm unlink ../projectA",{cwd: projectDir},done);
  });

  shared.shouldBehaveLikeAProject({
    gulp: gulp,
    tasks: [],
    distributionFiles: [],
    projectConfig: config
  });

  it("should prefix all file paths with 'testing-path' for the distribution", function(done){
      fs.lstat(path.join('./',distDir,'0','testing-path'), function(err, stats) {
        assert((!err && stats.isDirectory()),err);
        done();
      });
  });

});
