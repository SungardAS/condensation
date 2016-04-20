var _ = require('lodash');
var assert = require('assert');
var async = require('async');
var clone = require('clone');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var semver = require('semver');
var shared = require('./project-shared');

var projectDir = 'test/fixtures/projects/projectC';
var distDir = 'test/dist/pC';


var distributionFiles = [
  'particles/cftemplates/proj.template',
  'node_modules/projectB/particles/assets/bootstrap.sh',
  'node_modules/projectB/particles/assets/download.sh',
  'node_modules/projectA/particles/cftemplates/vpc.template'
];
if (semver.satisfies(process.version,">=5")) {
  distributionFiles.push('node_modules/projectA/particles/cftemplates/vpc.template');
}
else {
  distributionFiles.push('node_modules/projectB/node_modules/projectA/particles/cftemplates/vpc.template');
}

describe('projectC', function(){
  var gulp;

  before(function(done) {
    var pB = exec("npm install",{cwd: projectDir},done);
  });

  after(function(done) {
    exec("rm -rf node_modules/*",{cwd: projectDir},done);
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
