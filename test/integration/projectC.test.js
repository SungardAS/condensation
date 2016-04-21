var _ = require('lodash');
var assert = require('assert');
var async = require('async');
var clone = require('clone');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var semver = require('semver');
var shared = require('./project-shared');

describe('projectC', function(){
  var projectName = 'projectC';

  var config = shared.generateConfig(
      projectName,
      {distributionFiles:distributionFiles}
  );

  var distributionFiles = [
    'particles/cftemplates/proj.template',
    'node_modules/projectB/particles/assets/bootstrap.sh',
    'node_modules/projectB/particles/assets/download.sh'
  ];

  if (semver.gte(process.versions.node,"5.0.0")) {
    distributionFiles.push('node_modules/projectA/particles/cftemplates/vpc.template');
  }
  else {
    distributionFiles.push('node_modules/projectB/node_modules/projectA/particles/cftemplates/vpc.template');
  }

  before(function(done) {
    var pB = exec("npm install",{cwd: config.projectConfig.root},done);
  });

  after(function(done) {
    exec("rm -rf node_modules/*",{cwd: config.projectConfig.root},done);
  });

  shared.shouldBehaveLikeAProject(config);

});
